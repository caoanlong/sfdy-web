import React, { ReactNode, useEffect } from 'react'
import Head from "next/head"
import HeaderBar from './HeaderBar'
import FooterBar from './FooterBar'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { isPWA } from '../utils/tools'
import { RootState } from '../store'
import LoginModal from './LoginModal'
import { getInfo } from '../store/actions/userActions'

type LayoutProps = {
    children: ReactNode
}

function Layout({children}: LayoutProps) {
    const theme = useSelector((state: RootState) => state.config.theme)
    const token = useSelector((state: RootState) => state.member.token)
    const seo = useSelector((state: RootState) => state.config.seo)
    const showLogin = useSelector((state: RootState) => state.config.showLogin)
    const dispatch = useDispatch()

    const router = useRouter()

    const authPath = ['/mine']
    for (let i = 0; i < authPath.length; i++) {
        if (!token && router.pathname.startsWith(authPath[i])) {
            dispatch({ type: 'SET_LOGIN_MODAL', payload: true })
            router.push('/')
            break
        }
    }

    useEffect(() => {
        const now = new Date().getTime()
        router.events.on('routeChangeComplete', () => {
            // 因为html, body 都进行了定位，无法滚动
            document.getElementById('__next')?.scrollTo(0, 0)
        })
        token && dispatch(getInfo())
        const pwa = localStorage.getItem('pwa')
        if (!pwa && isPWA()) {
            localStorage.setItem('pwa', now.toString())
            window.gtag && window.gtag('event', 'pwa', { value: 'pwa' })
        }

        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        dispatch({
            type: 'SET_THEME',
            payload: prefersDarkMode ? 'dark' : 'light'
        })
        document.documentElement.className = prefersDarkMode ? 'dark' : 'light'
        document.body.style.backgroundColor = prefersDarkMode ? '#000' : '#fff'
    }, [])
    
    return (
        <div>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0,user-scalable=no,maximum-scale=1,viewport-fit=cover" />
                <meta name="keywords" content={seo?.seoKeywords} />
                <meta name="renderer" content="webkit|ie-comp|ie-stand" />
                <meta name="theme-color" content={process.env.theme_color} />
                <meta name='application-name' content={seo?.seoTitle} />
                <meta name='apple-mobile-web-app-capable' content='yes' />
                <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                <meta name='apple-mobile-web-app-title' content={seo?.seoTitle} />
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
            <div className="bg-white dark:bg-black min-h-screen">
                <HeaderBar></HeaderBar>
                <div className="pt-12 sm:pt-16">{children}</div>
                { showLogin ? <LoginModal /> : <></>}
                <FooterBar></FooterBar>
            </div>
        </div>
    )
}

export default Layout