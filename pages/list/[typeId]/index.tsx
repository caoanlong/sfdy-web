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
type SortItem = {
    code: string,
    name: string
}
const sortList: Array<SortItem> = [
    { code: 'time', name: '时间' },
    { code: 'hits', name: '人气' },
    { code: 'score', name: '评分' }
]
function List({ vodTypes }: ListProps) {
    const router = useRouter()
    const { typeId } = router.query
    const vodType = vodTypes.find(item => String(item.typeId) === typeId)
    const classes = '全部,' + vodType?.typeExtend?.class
    const classList = classes?.split(',')
    const [ currentClass, setCurrentClass ] = useState('全部')
    const [ currentSort, setCurrentSort ] = useState(sortList[0])
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
                                {
                                    sortList.map((item: SortItem) => (
                                        <li 
                                            key={item.code}
                                            className={`float-left text-sm px-5 h-8 flex justify-center items-center rounded-md cursor-pointer ${currentSort.code === item.code ? 'bg-purple-500 text-white shadow-lg' : 'text-gray-600'}`} 
                                            onClick={() => setCurrentSort(item)}>
                                            {item.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default List