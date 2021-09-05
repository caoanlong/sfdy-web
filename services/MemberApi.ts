import { GetCodeProps, LoginProps, RegisterProps } from '../store/actions/userActions'
import request from '../utils/request'

export type RegNumParams = {
    pageIndex: number,
    pageSize: number,
    pay: boolean
}

class MemberApi {
    static isClick = true
    static delay = 1000
    static url = '/member'

    static login(data: LoginProps) {
        if (!this.isClick) return Promise.reject('REPEAT_POST')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return request({
            url: this.url + '/login',
            method: 'post',
            data
        })
    }

    static register(data: RegisterProps) {
        if (!this.isClick) return Promise.reject('REPEAT_POST')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return request({
            url: this.url + '/register',
            method: 'post',
            data
        })
    }

    static getCode(params: GetCodeProps) {
        if (!this.isClick) return Promise.reject('REPEAT_POST')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return request({
            url: this.url + '/getCode',
            params
        })
    }

    static update(data: FormData) {
        if (!this.isClick) return Promise.reject('REPEAT_POST')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return request({
            url: this.url + '/update',
            method: 'post',
            data,
            headers: { 'Content-type': 'multipart/form-data;charset=UTF-8' }
        })
    }

    static info() {
        return request({
            url: this.url + '/info'
        })
    }

    static tokenInfo(token: string) {
        return request({
            url: this.url + `/token/${token}`
        })
    }

    static orders() {
        return request({
            url: this.url + '/orders'
        })
    }

    static regNum(params: RegNumParams) {
        return request({
            url: this.url + '/regNum',
            params
        })
    }
}

export default MemberApi