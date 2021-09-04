import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { ChangeEvent, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Toast from 'light-toast'
import CellItem from "../../components/CellItem"
import { RootState } from "../../store"
import Member from "../../types/Member"
import { getInfo, logout, updateMember } from "../../store/actions/userActions"
import { formDataReq } from "../../utils/tools"
import ButtonCom from "../../components/ButtonCom"
import { useRouter } from "next/router"
import ClipboardJS from 'clipboard'
import dayjs from "dayjs"

function Mine() {
    const dispatch = useDispatch()
    const router = useRouter()
    const member: Member = useSelector((state: RootState) => state.member)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files) {
            const file: File = e.target.files[0]
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJpgOrPng) {
                Toast.fail('只支持JPG/PNG文件')
                return
            }
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                Toast.fail('图片必须小于5MB!')
                return
            }
            const formData = formDataReq({ avatarFile: file })
            dispatch(updateMember({ formData, cb: () => {
                dispatch(getInfo())
            } }))
        }
    }

    useEffect(() => {
        const clipboard = new ClipboardJS('#copyBtn')
        clipboard.on('success', () => {
            Toast.success('复制成功')
        })
    }, [])
    return (
        <div>
            <div 
                className="w-28 h-28 sm:w-40 sm:h-40 text-6xl text-center overflow-hidden rounded-full bg-gray-200 mx-auto mt-8 relative">
                <input 
                    className="absolute top-0 left-0 right-0 bottom-0 z-10 w-full opacity-0" 
                    type="file" 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                />
                {
                    member.avatar ? 
                    <img 
                        className="w-full h-full object-cover" 
                        src={process.env.img_url + member.avatar} 
                        alt="" 
                    /> :
                    <FontAwesomeIcon 
                        className="text-gray-400 mt-6" 
                        icon={faUser}
                    />
                }
            </div>
            <div className="px-4 sm:w-2/4 sm:mx-auto">
                <CellItem label="名称" value={member.memberName} underLine={true} />
                <CellItem label="手机" value={member.mobile} underLine={true} />
                <CellItem label="邮箱" value={member.email} underLine={true} />
                <CellItem 
                    label="VIP" 
                    value={
                        member.vipEndTime 
                            ? dayjs(member.vipEndTime).format('YYYY-MM-DD HH:mm:ss') + ' 到期'
                            : '否'
                    }
                />
            </div>
            <div className="mt-4 px-4 sm:w-2/4 sm:mx-auto break-words">
                <div className="py-2 sm:inline-block">
                    <span className="text-black dark:text-gray-400">推广链接：</span>
                    <span 
                        className="bg-yellow-500 text-white text-sm px-4 py-1 rounded" 
                        id="copyBtn" 
                        data-clipboard-text={process.env.site_url + '/register/' + member.randomCode}>
                        复制链接
                    </span>
                </div>
                <p 
                    className="text-blue-500 sm:inline-block sm:ml-3">
                    {process.env.site_url + '/register/' + member.randomCode}
                </p>
            </div>
            <div className="px-4 my-6 sm:w-96 sm:mx-auto">
                <ButtonCom text="退出" onClick={() => {
                    dispatch(logout())
                    router.push('/')
                }}/>
            </div>
        </div>
    )
}

export default Mine