import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from 'react-slick'
import Link from 'next/link'
import { useState } from "react"

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
    const [ slideIndex, setSlideIndex ] = useState(0)

    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current: number, next: number) => {
            setSlideIndex(next)
        },
        appendDots: (dots: HTMLLIElement) => (
            <ul style={{bottom: 0}}>
                {dots}
            </ul>
        ),
        customPaging: (i: number) => (
            <div className={`mt-3 mx-auto w-3 h-1 rounded-sm bg-white ${slideIndex === i ? '' : 'bg-opacity-50'}`}></div>
        )
    }
    return (
        <Slider {...settings}>
            {
                banners.map((item, i) => (
                    <Link key={i} href={item.url}>
                        <a className="block h-36 sm:h-48 md:h-60 lg:h-72 xl:h-80 2xl:h-96">
                            <img className="w-full h-full object-cover" src={item.src} />
                        </a>
                    </Link>
                ))
            }
        </Slider>
    )
}

export default Banner