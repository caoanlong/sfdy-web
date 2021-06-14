import React, { ReactNode, useEffect } from 'react'
import Head from "next/head"
import HeaderBar from './HeaderBar'
import FooterBar from './FooterBar'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../store'
import { useRouter } from 'next/router'

type LayoutProps = {
    children: ReactNode
}

function Layout({children}: LayoutProps) {
    const theme = useSelector((state: State) => state.theme)
    const dispatch = useDispatch()

    const router = useRouter()

    useEffect(() => {
        router.events.on('routeChangeComplete', () => {
            // 因为html, body 都进行了定位，无法滚动
            document.getElementById('__next')?.scrollTo(0, 0)
        })

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
                <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0,user-scalable=no,maximum-scale=1,viewport-fit=cover" />
                <meta name="keywords" content={process.env.keywords} />
                <meta name="renderer" content="webkit|ie-comp|ie-stand" />
                <meta name="theme-color" content={process.env.theme_color} />
                <meta name='application-name' content={process.env.title} />
                <meta name='apple-mobile-web-app-capable' content='yes' />
                <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                <meta name='apple-mobile-web-app-title' content={process.env.title} />
                <meta name='format-detection' content='telephone=no' />
                <meta name='mobile-web-app-capable' content='yes' />
                <meta name='msapplication-TileColor' content={process.env.theme_color} />
                <meta name='msapplication-tap-highlight' content='no' />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
                <link rel='apple-touch-icon' sizes='152x152' href='/icons/apple-touch-icon-152.png' />
                <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon-180.png' />

                <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
                <link rel='manifest' href='/manifest.json' />
                <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color={process.env.theme_color} />
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