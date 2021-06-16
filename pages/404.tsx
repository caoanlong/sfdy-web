import { useRouter } from "next/router"
import { useEffect } from "react"
import SEO from '../components/SEO'

function Custom404() {
    const router = useRouter()
    useEffect(() => {
        router.push('/')
    })
    return (
        <main className="flex justify-center items-center text-3xl text-gray-600 min-h-screen">
            <SEO 
				title={`404-${process.env.title}`} 
				description={process.env.description as string} 
				canonical={process.env.site_url} 
			/>
            <h1>
                404 - Page Not Found
            </h1>
        </main>
    )
}

export default Custom404