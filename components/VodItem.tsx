import { LazyLoadImage } from 'react-lazy-load-image-component'
import Vod from '../types/Vod'

type VodItemProps = {
    vod: Vod
}

function VodItem({ vod }: VodItemProps) {
    return (
        <a 
            className="bg-white shadow-md overflow-hidden rounded-lg" 
            href="#"
            title={vod.vodName}
            key={vod.vodId}>
            <div className="aspectration" data-ratio="4:3">
                <div className="con overflow-hidden">
                    <LazyLoadImage
                        className="h-full w-full object-cover transition duration-500 transform hover:scale-125"
                        src={vod.vodPic}>
                    </LazyLoadImage>
                </div>
            </div>
            <div className="p-3 leading-relaxed">
                <h3 className="text-gray-700 truncate">{vod.vodName}</h3>
                <p className="text-gray-400 text-sm">{vod.vodClass}</p>
            </div>
        </a>
    )
}

export default VodItem