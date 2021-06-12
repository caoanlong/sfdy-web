import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Link from 'next/link'

const banners = [
    {
        src: '/images/banner1.png',
        url: '/detail/49070'
    },{
        src: '/images/banner2.png',
        url: '/detail/44693'
    }
]

function Banner() {
    return (
        <Carousel showThumbs={false}>
            {
                banners.map((item, i) => (
                    <Link key={i} href={item.url}>
                        <a className="block h-36 sm:h-48 md:h-60 lg:h-72 xl:h-80 2xl:h-96">
                            <img className="h-full object-cover" src={item.src} />
                        </a>
                    </Link>
                ))
            }
        </Carousel>
    )
}

export default Banner