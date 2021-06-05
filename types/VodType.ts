import Vod from './Vod'

interface VodType {
    typeId: number,
    typeName: string,
    typeEn: string,
    typeSort: number,
    typeMid: number,
    typePid: number,
    typeStatus: number,
    vods?: Array<Vod>
}

export default VodType