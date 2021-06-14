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
                    locale: process.env.lang,
                    site_name: process.env.title,
                    images: [
                        {
                            url: '/icons/og-image.png',
                            width: 512,
                            height: 512,
                            alt: process.env.title,
                        }
                    ]
                }}>
            </NextSeo>
        </>
    )
}

export default SEO