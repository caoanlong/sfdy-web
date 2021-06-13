import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import Toast from 'light-toast'

const service = axios.create({
    // baseURL: process.env.NODE_ENV !== 'production' ? 'https://jyavs.com/app' : 'http://10.74.12.30:8100/api',
    baseURL: 'https://jyavs.com/app',
    timeout: 15000
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
    return config
})

service.interceptors.response.use((res: AxiosResponse) => {
    if (res.data.code !== 200) {
        process.browser && Toast.fail(res.data.msg)
        return Promise.reject(res)
    }
    return res
}, (err: AxiosError) => {
    if (!err.response) {
        const msg = (err.toJSON() as any).message
        process.browser && Toast.fail(msg)
        return Promise.reject(msg)
    }
    process.browser && Toast.fail(err.response.status + ':' + err.response.statusText)
    return Promise.reject(err)
})

export default service