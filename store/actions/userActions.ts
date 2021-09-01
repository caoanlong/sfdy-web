import { Dispatch } from "react"
import { AnyAction } from "redux"
import { RootState } from ".."
import Toast from 'light-toast'
import MemberApi from "../../services/MemberApi"

const isServer = typeof window === 'undefined'

export type LoginProps = {
    mobile?: string,
    email?: string,
    memberName?: string,
    password: string
}

export type RegisterProps = LoginProps & {
    code: string
}

export type GetCodeProps = {
    account: string
}

export const login = ({ mobile, email, memberName, password, cb }: LoginProps & { cb?: () => void }) => {
    return function(dispatch: Dispatch<AnyAction>, getState: RootState) {
        Toast.loading('加载中...')
        MemberApi.login({ mobile, email, memberName, password }).then(res => {
            Toast.hide()
            !isServer && localStorage.setItem('_t', res.headers['authorization'])
            dispatch({
                type: 'SET_TOKEN',
                payload: res.headers['authorization']
            })
            cb && cb()
        }).catch(() => {
            Toast.hide()
        })
    }
}

export const register = ({ mobile, email, password, code, cb }: RegisterProps & { cb?: () => void }) => {
    return function(dispatch: Dispatch<AnyAction>, getState: RootState) {
        Toast.loading('加载中...')
        MemberApi.register({ mobile, email, password, code }).then(res => {
            Toast.hide()
            !isServer && localStorage.setItem('_t', res.headers['authorization'])
            dispatch({
                type: 'SET_TOKEN',
                payload: res.headers['authorization']
            })
            cb && cb()
        }).catch(() => {
            Toast.hide()
        })
    }
}

export const getInfo = () => {
    return function(dispatch: Dispatch<AnyAction>, getState: RootState) {
        MemberApi.info().then(res => {
            dispatch({
                type: 'SET_MEMBER',
                payload: res.data.data
            })
        })
    }
}