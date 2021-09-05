import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Toast from 'light-toast'
import { RootState } from "../../store"
import Member from "../../types/Member"
import { getInfo, logout, updateMember } from "../../store/actions/userActions"
import { useRouter } from "next/router"
import ClipboardJS from 'clipboard'
import dayjs from "dayjs"
import SEO from "../../components/SEO"
import Avatar from "../../components/Avatar"
import { GetServerSideProps } from "next"
import MemberApi from "../../services/MemberApi"
import Vip from "../../types/Vip"
import MyVipItem from "../../components/MyVipItem"
import Segement, { Seg } from "../../components/Segement"
import MyVips from "../../components/MyVips"
import Vips from "../../components/Vips"
import MyOrders from "../../components/MyOrders"
import VipApi from "../../services/VipApi"
import Order from "../../types/Order"

const tabs: Seg[] = [
    { id: 1, path: '', name: '我的VIP' },
    { id: 2, path: '', name: '购买VIP' },
    { id: 3, path: '', name: '账单记录' }
]

type MineProps = {
    member: Member
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const token = query.token as string
    const res = await MemberApi.tokenInfo(token)
    const member = res.data.data
    const vips = member.vips as Vip[]
    let t = 0
    for (const vip of vips) {
        vip.endTimeTS = dayjs(dayjs(vip.startTime).valueOf() + vip.validDays * 86400000).valueOf()
        if (vip.endTimeTS > t) {
            t = vip.endTimeTS
        }
    }
    member.vipEndTime = t
    return {
        props: {
            member
        }
    }
}

function Mine({ member }: MineProps) {
    const dispatch = useDispatch()
    const router = useRouter()
    const seo = useSelector((state: RootState) => state.config.seo)

    const [ active, setActive ] = useState<Seg>(tabs[0])
    const [ vipList, setVipList ] = useState<Vip[]>([])
    const [ orderList, setOrderList ] = useState<Order[]>([])

    const Record = () => {
        if (active.id === 1) return <MyVips vips={member.vips}/>
        if (active.id === 2) return <Vips vipList={vipList}/>
        if (active.id === 3) return <MyOrders orderList={orderList}/>
        return <></>
    }

    
    const getVipList = () => {
        Toast.loading('加载中...')
        VipApi.findPayVips().then(res => {
            Toast.hide()
            setVipList(res.data.data)
        }).catch(() => {
            Toast.hide()
        })
    }
    

    const getOrderList = () => {
        Toast.loading('加载中...')
        MemberApi.orders().then(res => {
            Toast.hide()
            setOrderList(res.data.data)
        }).catch(() => {
            Toast.hide()
        })
    }

    useEffect(() => {
        dispatch({
            type: 'SET_MEMBER',
            payload: member
        })
    }, [])

    useEffect(() => {
        const clipboard = new ClipboardJS('#copyBtn')
        clipboard.on('success', () => {
            Toast.success('复制成功')
        })
    }, [])

    return (
        <main>
            <SEO 
				title={`我的-${seo?.seoTitle}`} 
				description={seo?.seoDescription} 
				canonical={process.env.site_url}
			/>
            <div className="container sm:w-2/3">
                <div className="px-4 my-4">
                    <div className="flex">
                        <div className="w-24 h-24">
                            <Avatar 
                                image={member.avatar}
                                changCallback={(formData: FormData) => {
                                    dispatch(updateMember({ formData, cb: () => {
                                        dispatch(getInfo())
                                    } }))
                                }}
                            />
                        </div>
                        <div className="flex-1 pl-3 text-sm flex flex-col justify-center">
                            <div className="flex">
                                <div className="w-16 text-black dark:text-gray-100">账号：</div>
                                <div className="flex-1 text-gray-600 dark:text-gray-400">
                                    {member.memberName || '无'}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-16 text-black dark:text-gray-100">手机：</div>
                                <div className="flex-1 text-gray-600 dark:text-gray-400">
                                    {member.mobile || '无'}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-16 text-black dark:text-gray-100">邮箱：</div>
                                <div className="flex-1 text-gray-600 dark:text-gray-400">
                                    {member.email || '无'}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-16 text-black dark:text-gray-100">VIP：</div>
                                <div className="flex-1 text-gray-600 dark:text-gray-400">
                                    {
                                        member.vipEndTime 
                                        ? dayjs(member.vipEndTime).format('YYYY-MM-DD HH:mm:ss') + ' 到期'
                                        : '无'
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="hidden sm:block w-28">
                            <div 
                                onClick={() => {
                                    dispatch(logout())
                                    router.push('/')
                                }}
                                className="rounded-lg py-1 bg-white dark:bg-black text-gray-600 dark:text-gray-400 border dark:border-gray-800 text-center mt-4 cursor-pointer">
                                退出
                            </div>
                        </div>
                    </div>
                </div>
        
                <div className="mt-4 px-4 sm:w-2/4 break-words">
                    <div className="py-2 sm:inline-block">
                        <span className="text-black dark:text-gray-400">推广链接：</span>
                        <span 
                            className="bg-pink-500 text-white text-sm px-4 py-1 rounded" 
                            id="copyBtn" 
                            data-clipboard-text={process.env.site_url + '/register/' + member.randomCode}>
                            复制链接
                        </span>
                    </div>
                    <p 
                        className="text-pink-500 sm:inline-block sm:ml-3">
                        {process.env.site_url + '/register/' + member.randomCode}
                    </p>
                </div>
                <div className="px-4 mt-3">
                    <Segement 
                        list={tabs} 
                        active={active} 
                        onChange={(item: Seg) => {
                            setActive(item)
                            if (item.id === 2) {
                                getVipList()
                            } else if (item.id === 3) {
                                getOrderList()
                            }
                        }} 
                    />
                    <div className="mt-3">
                        <Record />
                    </div>
                </div>
                <div className="px-4 my-6 sm:hidden">
                    <div 
                        onClick={() => {
                            dispatch(logout())
                            router.push('/')
                        }}
                        style={{height: '48px', lineHeight: '48px'}}
                        className="w-full rounded-lg bg-white dark:bg-black text-gray-600 dark:text-gray-400 border dark:border-gray-800 text-center mt-4 cursor-pointer">
                        退出
                    </div>
                </div>
            </div>
            
        </main>
    )
}

export default Mine