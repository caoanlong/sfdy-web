import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout, { getVodTypes } from '../../components/Layout'
import VodType from '../../types/VodType'


type SearchProps = {
    vodTypes: Array<VodType>,
    keyword: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const vodTypes = await getVodTypes()
    const keyword: string = query.keyword as string

    return {
        props: {
            vodTypes,
            keyword
        }
    }
}

function Search({ vodTypes, keyword }: SearchProps) {
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
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default Search