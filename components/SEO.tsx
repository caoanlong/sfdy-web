import { NextSeo } from 'next-seo'

type SEOProps = {
    title: string,
    description: string,
    canonical?: string
}

function SEO({ title, description, canonical }: SEOProps) {
    return (
        <>
            <NextSeo 
                title={title} 
                description={description} 
                canonical={canonical} 
                openGraph={{
                    title,
                    description,
                    url: canonical,
                    locale: 'zh-CN',
                    site_name: '巨硬AV'
                }}>
            </NextSeo>
        </>
    )
}

export default SEO