import { GetServerSideProps } from "next"
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import VodApi from '../../services/VodApi'
import Vod from "../../types/Vod"
import { useStore } from "react-redux"
import VodType from "../../types/VodType"
import Link from "next/link"
import VodItem from "../../components/VodItem"
import SEO from '../../components/SEO'
import { useEffect } from "react"


function scoreToStars(score: number) {
    const min = Math.floor(score / 2)
    const max = Math.ceil(score / 2)
    const list: Array<JSX.Element> = []
    for (let i = 0; i < min; i++) {
        list.push(
            <FontAwesomeIcon
                key={i}
                className="w-4 h-4 inline-block text-yellow-500" 
                icon={faStar}/>
        )
    }
    if (max > min) {
        list.push(
            <FontAwesomeIcon
                key="-1"
                className="w-4 h-4 inline-block text-yellow-500" 
                icon={faStarHalf}/>
        )
    }
    return list
}

function numberToString(num: number) {
    return num.toFixed(2).slice(0, -1)
}

type DetailProps = {
    vod: Vod,
    likeList: Array<Vod>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const vodId: number = Number(query.vodId)
    const resById = await VodApi.findById({ vodId })
    const vod: Vod = resById?.data?.data
    const resLike = await VodApi.findYouLike({ typeId: vod.typeId, vodClass: vod.vodClass, num: 12 })
    
    return {
        props: {
            vod,
            likeList: resLike?.data?.data
        }
    }
}

function Detail({ vod, likeList }: DetailProps) {
    const store = useStore()
    const state = store.getState()
    const typeList = state.typeList
    const currentType: VodType = typeList.find((vodType: VodType) => vodType.typeId === vod.typeId)

    return (
        <main>
            <SEO 
				title={`${vod.vodName}-${process.env.title}`} 
				description={`${vod.vodName},${process.env.description}`} 
				canonical={process.env.site_url} 
			/>
            <div className="container py-4">
                <div className="bg-white dark:bg-gray-900 shadow p-3 sm:rounded-lg lg:p-5">
                    <div className="text-xs text-gray-400 dark:text-gray-600 mb-2 sm:text-sm sm:mb-4">
                        <span>当前位置：</span>
                        <Link href="/">
                            <a className="text-gray-700 dark:text-gray-400 px-1">首页</a>
                        </Link>
                        <FontAwesomeIcon 
                            style={{top: '-2px'}}
                            className="w-2 h-2 text-gray-400 relative inline-block" 
                            icon={faChevronRight}/>
                        <Link href={`/list/${currentType.typeId}/全部`}>
                            <a className="text-gray-700 dark:text-gray-400 px-1">{currentType.typeName}</a>
                        </Link>
                        <FontAwesomeIcon 
                            style={{top: '-2px'}}
                            className="w-2 h-2 text-gray-400 relative inline-block" 
                            icon={faChevronRight}/>
                        <span className="pl-1">{vod.vodName}</span>
                    </div>
                    <h1 className="text-lg mb-2 sm:hidden dark:text-gray-400">{vod.vodName}</h1>
                    <div className="flex">
                        <div className="w-48 sm:w-72">
                            <div className="aspectration" data-ratio="4:3">
                                <div className="con overflow-hidden rounded">
                                    <img 
                                        className="h-full w-full object-cover transition duration-500 transform hover:scale-125" 
                                        src={process.env.site_url + '/' + vod.vodPic} 
                                        alt={vod.vodName} />
                                </div>
                            </div>

                        </div>
                        <div className="flex-1 text-sm text-gray-400 dark:text-gray-600 pl-3">
                            <h1 className="hidden sm:block text-lg text-gray-800 dark:text-gray-400 lg:text-2xl lg:mb-2">
                                {vod.vodName}
                            </h1>
                            <p>
                                <span>评分：</span>
                                <span className="relative" style={{top: '-2px'}}>
                                    { scoreToStars(vod.vodScore) }
                                </span>
                                <span className="text-yellow-500 text-base ml-1">
                                    { numberToString(vod.vodScore) }
                                </span>
                            </p>
                            <p>
                                <span>分类：</span>
                                <span className="border-r dark:border-gray-700 pr-2">{currentType.typeName}</span>
                                <span className="pl-2">{vod.vodClass}</span>
                            </p>
                            <p>
                                <span>更新：</span>
                                <span>{dayjs(vod.vodTime * 1000).format('YYYY-MM-DD')}</span>
                            </p>
                            <p>
                                <span>主演：</span>
                                <span>未知</span>
                            </p>
                            <p>
                                <span>导演：</span>
                                <span>未知</span>
                            </p>
                            <Link href={`/play/${vod.vodId}`}>
                                <a 
                                    className="bg-purple-500 py-2 text-center text-white rounded mt-2 shadow-lg sm:w-32 sm:mt-3 cursor-pointer block">
                                    立即播放
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-900 shadow p-3 my-4 sm:rounded-lg">
                    <h1 className="text-lg py-2 dark:text-gray-400">猜你喜欢</h1>
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                        {
                            likeList?.map((item: Vod) => (
                                <VodItem vod={item} isInShadow={true} key={item.vodId}></VodItem>
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Detail