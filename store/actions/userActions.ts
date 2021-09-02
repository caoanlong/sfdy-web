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
    randomCode?: string,
    code: string
}

export type UpdateProps = {
    formData: FormData
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

export const register = ({ randomCode, mobile, email, password, code, cb }: RegisterProps & { cb?: () => void }) => {
    return function(dispatch: Dispatch<AnyAction>, getState: RootState) {
        Toast.loading('加载中...')
        MemberApi.register({ randomCode, mobile, email, password, code }).then(res => {
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

export const updateMember = ({ formData, cb }: UpdateProps & { cb?: () => void }) => {
    return function(dispatch: Dispatch<AnyAction>, getState: RootState) {
        Toast.loading('加载中...')
        MemberApi.update(formData).then(res => {
            Toast.hide()
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
        }).catch(err => {
            if (err.data && err.data.code === 403) {
                dispatch({ type: 'DEL_MEMBER' })
            }
        })
    }
}

export const logout = () => {
    return function(dispatch: Dispatch<AnyAction>, getState: RootState) {
        dispatch({ type: 'DEL_MEMBER' })
        localStorage.removeItem('_t')
    }
}