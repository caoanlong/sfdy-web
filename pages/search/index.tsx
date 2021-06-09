import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout, { getVodTypes } from '../../components/Layout'
import SearchItem from '../../components/SearchItem'
import VodApi from '../../services/VodApi'
import Vod from '../../types/Vod'
import VodType from '../../types/VodType'


type SearchProps = {
    vodTypes: Array<VodType>,
    keyword: string,
    vodList: Array<Vod>,
    pageIndex: number,
    pageSize: number,
    total: number,
    pages: number
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const pageIndex: number = Number(query.pageIndex ?? 1)
    const pageSize: number = Number(query.pageSize ?? 24)
    const vodTypes = await getVodTypes()
    const keyword: string = query.keyword as string
    const params = {
        pageIndex,
        pageSize,
        keyword
    }
    const { data } = await VodApi.search(params)
    const vodList: Array<Vod> = data.data.list
    const total: number = data.data.total
    const pages: number = data.data.pages

    return {
        props: {
            vodTypes,
            keyword,
            vodList,
            pageIndex,
            pageSize,
            total,
            pages
        }
    }
}

function Search({ vodTypes, keyword, vodList, pageIndex, pageSize, total, pages }: SearchProps) {
    return (
        <Layout vodTypes={vodTypes}>
            <main className="px-4">
                <div className="container py-4">
                    <div className="bg-white dark:bg-gray-900 shadow rounded-lg pb-5">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                            <h2 className="text-lg text-gray-700 inline-block">
                                与 <span className="text-red-500">“{keyword}”</span> 相关的结果
                            </h2>
                        </div>
                        <div>
                            {
                                vodList.map((vod: Vod, i: number) => (
                                    <SearchItem key={vod.vodId} vod={vod} index={i}></SearchItem>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default Search