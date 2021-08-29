import { Dispatch } from "react"
import { AnyAction } from "redux"
import { RootState } from ".."
import MemberApi from "../../services/MemberApi"

export type LoginProps = {
    mobile?: string,
    email?: string,
    password: string
}

export const login = ({ mobile, email, password }: LoginProps) => {
    return function(dispatch: Dispatch<AnyAction>, getState: RootState) {
        MemberApi.login({ mobile, email, password }).then(res => {
            dispatch({
                type: 'SET_TOKEN',
                payload: res.headers['Authorization']
            })
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