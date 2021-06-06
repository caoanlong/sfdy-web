import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout, { getVodTypes } from '../../../components/Layout'
import VodType from '../../../types/VodType'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const vodTypes = await getVodTypes()
    return {
        props: {
            vodTypes
        }
    }
}

type ListProps = {
    vodTypes: Array<VodType>
}
function List({ vodTypes }: ListProps) {
    const router = useRouter()
    const { typeId } = router.query
    const vodType = vodTypes.find(item => String(item.typeId) === typeId)
    const classes = '全部,' + vodType?.typeExtend?.class
    const classList = classes?.split(',')
    const [ currentClass, setCurrentClass ] = useState('全部')
    return (
        <Layout vodTypes={vodTypes}>
            <main className="pt-16">
                <div className="container py-6">
                    <div className="bg-white shadow rounded-lg pb-5">
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-lg text-gray-700 inline-block">{vodType?.typeName}</h2>
                            <span className="text-sm text-gray-400 ml-2">重置筛选</span>
                        </div>
                        <div className="flex my-5">
                            <div className="w-16 text-sm text-gray-400 text-center h-8 flex justify-center items-center">剧情</div>
                            <ul className="flex-1 clearfix">
                                {
                                    classList?.map(cls => (
                                        <li 
                                            key={cls} 
                                            className={
                                                `float-left text-sm px-5 h-8 flex justify-center items-center rounded-md cursor-pointer ${cls === currentClass ? 'bg-purple-500 text-white shadow-lg' : 'text-gray-600' }`
                                            } 
                                            onClick={() => setCurrentClass(cls)}>
                                            {cls}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex">
                            <div className="w-16 text-sm text-gray-400 text-center h-8 flex justify-center items-center">排序</div>
                            <ul className="flex-1 clearfix">
                                <li className="float-left text-sm px-5 h-8 flex justify-center items-center rounded-md cursor-pointer bg-purple-500 text-white shadow-lg">时间</li>
                                <li className="float-left text-sm text-gray-600 px-5 h-8 flex justify-center items-center rounded-md cursor-pointer">人气</li>
                                <li className="float-left text-sm text-gray-600 px-5 h-8 flex justify-center items-center rounded-md cursor-pointer">评分</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default List