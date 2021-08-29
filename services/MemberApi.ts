import { LoginProps } from '../store/actions/userActions'
import request from '../utils/request'

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

    static info() {
        return request({
            url: this.url + '/info'
        })
    }
}

export default MemberApi