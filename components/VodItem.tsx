import LazyLoad from 'react-lazyload'
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
                <div className="con">
                    <LazyLoad height="100%">
                        <img className="object-cover h-full" src={vod.vodPic} alt="" />
                    </LazyLoad>
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