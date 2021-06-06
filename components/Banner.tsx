import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

function Banner() {
    return (
        <Carousel showThumbs={false}>
            <div className="h-36 sm:h-48 md:h-60 lg:h-72 xl:h-80 2xl:h-96">
                <img className="h-full object-cover" src="/images/banner1.png" />
            </div>
            <div className="h-36 sm:h-48 md:h-60 lg:h-72 xl:h-80 2xl:h-96">
                <img className="h-full object-cover" src="/images/banner2.png" />
            </div>
        </Carousel>
    )
}

export default Banner