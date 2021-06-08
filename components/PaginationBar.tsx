import Link from 'next/link'

type PaginationProps = {
    pageIndex: number, 
    pageSize: number, 
    pages: number, 
    total: number,
    typeId: number,
    vodClass?: string,
    orderBy?: string
}

function PaginationBar({ pageIndex, pageSize, pages, total, typeId, vodClass, orderBy }: PaginationProps) {
    const first = `/list/${typeId}?pageIndex=1&pageSize=${pageSize}&vodClass=${vodClass}&orderBy=${orderBy}`
    const last = `/list/${typeId}?pageIndex=${pages}&pageSize=${pageSize}&vodClass=${vodClass}&orderBy=${orderBy}`
    const prev = `/list/${typeId}?pageIndex=${pageIndex-1}&pageSize=${pageSize}&vodClass=${vodClass}&orderBy=${orderBy}`
    const next = `/list/${typeId}?pageIndex=${pageIndex+1}&pageSize=${pageSize}&vodClass=${vodClass}&orderBy=${orderBy}`

    let list = []
    if (pages <= 5) {
        for (let i = 1; i < pages + 1; i++) {
            list.push(i)
        }
    } else {
        for (let i = pageIndex - 2; i < pageIndex + 3; i++) {
            list.push(i)
        }
    }
    return (
        <div className="flex py-6 justify-center text-xs text-gray-700">
            <Link href={first}>
                <a 
                    className={`bg-white px-3 py-2 rounded shadow-md mr-2 ${pageIndex === 1 && 'pointer-events-none cursor-not-allowed'}`}>
                    首页
                </a>
            </Link>
            <Link href={prev}>
                <a 
                    className={`bg-white px-4 py-2 rounded shadow-md mr-2 ${pageIndex === 1 && 'pointer-events-none cursor-not-allowed'}`}>
                    上一页
                </a>
            </Link>
            
            <div className="md:hidden bg-purple-500 text-white px-4 py-2 rounded shadow-md mr-2">
                {pageIndex}/{pages}
            </div>
            {
                list.map((item: number) => (
                    <div className="hidden md:block bg-white px-4 py-2 rounded shadow-md mr-2">{item}</div>
                ))
            }
            <Link href={next}>
                <a 
                    className={`bg-white px-4 py-2 rounded shadow-md mr-2 ${pageIndex === pages && 'pointer-events-none cursor-not-allowed'}`}>
                    下一页
                </a>
            </Link>
            <Link href={last}>
                <a 
                    className={`bg-white px-3 py-2 rounded shadow-md ${pageIndex === pages && 'pointer-events-none cursor-not-allowed'}`}>
                    尾页
                </a>
            </Link>
        </div>
    )
}

export default PaginationBar