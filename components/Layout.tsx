import React, { ReactNode } from 'react'
import Head from 'next/head'
import HeaderBar from './HeaderBar'
import FooterBar from './FooterBar'
import VodType from '../types/VodType'
import VodTypeApi from '../services/VodTypeApi'

function decodeUnicode(str: string) {
    str = str.replace(/\\/g, "%")
    return unescape(str)
}

export const getVodTypes = async () => {
    const res = await VodTypeApi.findAll()
    if (res.data.code != 200 || !res.data.data) {
      return null
    }
    return res.data.data.map((item: VodType) => ({ ...item, typeExtendJson: JSON.parse(decodeUnicode(item.typeExtend)) }))
}

type LayoutProps = {
    children: ReactNode,
    vodTypes: Array<VodType>
}

function Layout({children, vodTypes}: LayoutProps) {
    return (
        <div className="bg-gray-50">
            <Head>
                <title>巨硬AV</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeaderBar vodTypes={vodTypes}></HeaderBar>
            <div>{children}</div>
            <FooterBar></FooterBar>
        </div>
    )
}

export default Layout