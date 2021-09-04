import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import Toast from 'light-toast'

const isServer = typeof window === 'undefined'

const service = axios.create({
    baseURL: isServer ? process.env.api_url : '/app',
    timeout: 15000
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
    if (!isServer) {
        const token = localStorage.getItem('_t')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
    }
    
    return config
})

service.interceptors.response.use((res: AxiosResponse) => {
    if (res.data.code !== 200) {
        process.browser && Toast.fail(res.data.message)
        if (res.data.code === 403) {
            !isServer && localStorage.removeItem('_t')
        } 
        return Promise.reject(res)
    }
    return res
}, (err: AxiosError) => {
    console.log(err)
    if (!err.response) {
        const msg = (err.toJSON() as any).message
        process.browser && Toast.fail(msg)
        return Promise.reject(msg)
    }
    process.browser && Toast.fail(err.response.status + ':' + err.response.statusText)
    return Promise.reject(err)
})

export default service