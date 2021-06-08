import request from '../utils/request'

export type VodHomeNewParams = {
    num: number
}

export type VodFindListParams = {
    typeId: number, 
    vodClass?: string, 
    orderBy?: string
}

class VodApi {
    static isClick = true
    static delay = 1000
    static url = '/vod'

    static homeNew(params: VodHomeNewParams) {
        return request({
            url: this.url + '/homeNew',
            params
        })
    }

    static findList(params: VodFindListParams) {
        console.log(params)
        return request({
            url: this.url + '/findList',
            params
        })
    }
}

export default VodApi