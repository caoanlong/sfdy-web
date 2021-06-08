import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout, { getVodTypes } from '../../../components/Layout'
import VodApi, { VodFindListParams } from '../../../services/VodApi'
import Vod from '../../../types/Vod'
import VodType from '../../../types/VodType'

const ALL = '全部'
const SORTLIST: Array<SortItem> = [
    { code: 'time', name: '时间' },
    { code: 'hits', name: '人气' },
    { code: 'score', name: '评分' }
]

type ListProps = {
    vodTypes: Array<VodType>,
    vodType: VodType,
    classList: Array<string>,
    vodList: Array<Vod>,
    total: number,
    pages: number
}
type SortItem = {
    code: string,
    name: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const typeId: number = Number(query.typeId)
    const vodClass: string = query.vodClass as string
    const orderBy: string = query.orderBy as string
    const vodTypes = await getVodTypes()
    const vodType = vodTypes.find((item: VodType) => item.typeId === typeId)
    const classes = ALL + ',' + vodType?.typeExtendJson?.class
    const classList = classes?.split(',')
    const params: VodFindListParams = {
        typeId, 
        orderBy: orderBy || SORTLIST[0].code 
    }
    if (vodClass && vodClass !== ALL) {
        params.vodClass = vodClass
    }
    const { data } = await VodApi.findList(params)
    const vodList: Array<Vod> = data.data.list
    const total: number = data.data.total
    const pages: number = data.data.pages
    return {
        props: {
            vodTypes,
            vodType,
            classList,
            vodList,
            total,
            pages
        }
    }
}

function List({ vodTypes, vodType, classList, vodList, total, pages }: ListProps) {
    const router = useRouter()
    const { typeId, vodClass=ALL, orderBy=SORTLIST[0].code } = router.query

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
                                                `float-left text-sm px-5 h-8 flex justify-center items-center rounded-md cursor-pointer ${cls === vodClass ? 'bg-purple-500 text-white shadow-lg' : 'text-gray-600' }`
                                            }>
                                            <Link 
                                                href={`/list/${typeId}?vodClass=${cls}&orderBy=${orderBy}`}>
                                                <a>{cls}</a>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex">
                            <div className="w-16 text-sm text-gray-400 text-center h-8 flex justify-center items-center">排序</div>
                            <ul className="flex-1 clearfix">
                                {
                                    SORTLIST.map((item: SortItem) => (
                                        <li 
                                            key={item.code}
                                            className={`float-left text-sm px-5 h-8 flex justify-center items-center rounded-md cursor-pointer ${orderBy === item.code ? 'bg-purple-500 text-white shadow-lg' : 'text-gray-600'}`}>
                                            <Link 
                                                href={`/list/${typeId}?vodClass=${vodClass}&orderBy=${item.code}`}>
                                                <a>{item.name}</a>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div>
                        {
                            vodList.map(item => (
                                <div key={item.vodId}>{item.vodName}</div>
                            ))
                        }
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default List