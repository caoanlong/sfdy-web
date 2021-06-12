import React, { ReactNode, useEffect } from 'react'
import Head from "next/head"
import HeaderBar from './HeaderBar'
import FooterBar from './FooterBar'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../store'

type LayoutProps = {
    children: ReactNode
}

function Layout({children}: LayoutProps) {
    const theme = useSelector((state: State) => state.theme)
    const dispatch = useDispatch()

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        const t = localStorage.getItem('theme')
        if (t) {
            dispatch({
                type: 'SET_THEME',
                payload: t
            })
        } else {
            if (prefersDarkMode) {
                dispatch({
                    type: 'SET_THEME',
                    payload: 'dark'
                })
                localStorage.setItem('theme', 'dark')
            } else {
                dispatch({
                    type: 'SET_THEME',
                    payload: 'light'
                })
                localStorage.setItem('theme', 'light')
            }
        }
    })
    
    return (
        <div className={theme}>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0,user-scalable=no,maximum-scale=1" key="viewport" />
                <meta name="keywords" content="短视频,搞笑视频,视频分享,免费视频,在线视频,预告片" />
                <meta name="renderer" content="webkit|ie-comp|ie-stand" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-gray-50 dark:bg-gray-800">
                <HeaderBar></HeaderBar>
                <div className="pt-12 sm:pt-16">{children}</div>
                <FooterBar></FooterBar>
            </div>
        </div>
    )
}

export default Layout