import { NextSeo } from 'next-seo'
import { OpenGraphImages } from 'next-seo/lib/types'

type SEOProps = {
    title: string,
    description: string,
    canonical?: string,
    type?: string,
    image?: OpenGraphImages,
    tCardType?: string
}

function SEO({ 
    title, 
    description, 
    canonical, 
    type='website', 
    image, 
    tCardType='summary' 
}: SEOProps) {
    const images: Array<OpenGraphImages> = [
        {
            url: '/icons/og-image.png',
            width: 512,
            height: 512,
            alt: process.env.title,
        }
    ]
    if (image) {
        images.push(image)
    }
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
                    type,
                    images
                }} 
                twitter={{
                    site: '@slxgshxc',
                    cardType: tCardType
                }}>
            </NextSeo>
        </>
    )
}

export default SEO