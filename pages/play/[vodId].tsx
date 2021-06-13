import { GetServerSideProps } from "next"
import { useStore } from "react-redux"
import ReactPlayer from 'react-player'
import VodApi from "../../services/VodApi"
import Vod from "../../types/Vod"
import VodType from "../../types/VodType"
import VodItem from "../../components/VodItem"
import { useEffect, useState } from "react"

type PlayProps = {
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


function Play({ vod, likeList }: PlayProps) {
    const store = useStore()
    const state = store.getState()
    const typeList = state.typeList
    const currentType: VodType = typeList.find((vodType: VodType) => vodType.typeId === vod.typeId)
    const [ isSafari, setIsSafari ] = useState(false)
    useEffect(() => {
        setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
    })
    
    return (
        <main>
            <div className="container sm:py-4">
                <div className="bg-white dark:bg-gray-900 shadow">
                    <div className="w-full">
                        <div className="aspectration" data-ratio="16:9">
                            <div className="con overflow-hidden">
                                <ReactPlayer 
                                    url={vod.vodPlayUrl}
                                    playing={true}
                                    controls={true}
                                    width="100%"
                                    height="100%"
                                    config={{
                                        file: {
                                            forceHLS: !isSafari,
                                            forceVideo: true,
                                            hlsVersion: '0.12.4',
                                            attributes: {
                                                // poster: 'https://sfdy1.com/' + vod.vodPic,
                                                disablePictureInPicture: true
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl px-3 pt-3 dark:text-gray-200">{vod.vodName}</h1>
                    <p className="text-sm text-gray-500 px-3 pb-3">
                        <span className="mr-2">{currentType.typeName}</span>
                        <span>{vod.vodClass}</span>
                    </p>
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

export default Play