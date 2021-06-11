import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import VodItem from '../../../../../components/VodItem'
import PaginationBar from '../../../../../components/PaginationBar'
import VodApi, { VodFindListParams } from '../../../../../services/VodApi'
import Vod from '../../../../../types/Vod'
import VodType from '../../../../../types/VodType'
import { useSelector } from 'react-redux'
import { State } from '../../../../../store'

const ALL = '全部'
const SORTLIST: Array<SortItem> = [
    { code: 'time', name: '时间' },
    { code: 'hits', name: '人气' },
    { code: 'score', name: '评分' }
]

type ListProps = {
    vodType: VodType,
    classList: Array<string>,
    vodList: Array<Vod>,
    pageIndex: number,
    pageSize: number,
    total: number,
    pages: number
}
type SortItem = {
    code: string,
    name: string
}

function decodeUnicode(str: string) {
    str = str.replace(/\\/g, "%")
    return unescape(str)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const pageIndex: number = Number(query.pageIndex ?? 1)
    const pageSize: number = Number(query.pageSize ?? 24)
    const typeId: number = Number(query.typeId)
    const vodClass: string = query.vodClass as string
    const orderBy: string = query.orderBy as string

    const params: VodFindListParams = {
        pageIndex,
        pageSize,
        typeId, 
        orderBy: orderBy ?? SORTLIST[0].code 
    }
    if (vodClass && vodClass !== ALL) {
        params.vodClass = vodClass
    }
    const { data } = await VodApi.findList(params)
    const vodList: Array<Vod> = data.data.list
    const pages: number = data.data.pages
    return {
        props: {
            vodList,
            pageIndex,
            pageSize,
            pages
        }
    }
}

function List({ 
    vodList, 
    pageIndex, 
    pageSize, 
    pages 
}: ListProps) {
    const router = useRouter()
    const { typeId, vodClass=ALL, orderBy=SORTLIST[0].code } = router.query
    const vodTypes = useSelector((state: State) => state.typeList)
    const vodType = vodTypes.find((item: VodType) => item.typeId === Number(typeId))
    const typeExtendJson = JSON.parse(decodeUnicode((vodType?.typeExtend) as string))
    const classes = ALL + ',' + typeExtendJson?.class
    const classList = classes?.split(',')
    return (
        <main className="px-4">
            <div className="container py-4">
                <div className="bg-white dark:bg-gray-900 shadow rounded-lg pb-5">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                        <h2 className="text-lg text-gray-700 dark:text-gray-300 inline-block">{vodType?.typeName}</h2>
                        <Link href={`/list/${typeId}`}>
                            <a className="text-sm text-gray-400 ml-2 cursor-pointer">重置筛选</a>
                        </Link>
                    </div>
                    <div className="flex my-5">
                        <div className="w-16 text-sm text-gray-400 text-center h-8 flex justify-center items-center">剧情</div>
                        <ul className="flex-1 clearfix">
                            {
                                classList?.map(cls => (
                                    <li 
                                        key={cls} 
                                        className={
                                            `float-left text-xs sm:text-sm px-5 h-8 flex justify-center items-center rounded-md cursor-pointer ${cls === vodClass ? 'bg-purple-500 text-white shadow-lg' : 'text-gray-600 hover:text-purple-500' }`
                                        }>
                                        <Link 
                                            href={`/list/${typeId}/${cls}/${orderBy}?pageIndex=1&pageSize=${pageSize}`}>
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
                                        className={`float-left text-xs sm:text-sm px-5 h-8 flex justify-center items-center rounded-md cursor-pointer ${orderBy === item.code ? 'bg-purple-500 text-white shadow-lg' : 'text-gray-600 hover:text-purple-500'}`}>
                                        <Link 
                                            href={`/list/${typeId}/${vodClass}/${item.code}?pageIndex=1&pageSize=${pageSize}`}>
                                            <a>{item.name}</a>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                    {
                        vodList.map(vod => (<VodItem key={vod.vodId} vod={vod}/>))
                    }
                </div>
                <PaginationBar 
                    pageIndex={pageIndex} 
                    pageSize={pageSize} 
                    pages={pages} 
                    baseUrl={`/list/${typeId}/${vodClass}/${orderBy}`}/>
            </div>
        </main>
    )
}

export default List