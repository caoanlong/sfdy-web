import { useRouter } from "next/router"
import { useEffect } from "react"

function Custom404() {
    const router = useRouter()
    useEffect(() => {
        router.push('/')
    })
    return (
        <h1 
            className="flex justify-center items-center text-3xl text-gray-600"
            style={{minHeight: '540px'}}>
            404 - Page Not Found
        </h1>
    )
}

export default Custom404