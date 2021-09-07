import React, { MouseEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import Toast from 'light-toast'
import MemberApi from "../services/MemberApi"
import { RootState } from "../store"
import Vip from "../types/Vip"
import ButtonCom from "./ButtonCom"
import { getInfo } from "../store/actions/userActions"

function BuyVipModal() {
    const dispatch = useDispatch()
    const currentBuyVip: Vip = useSelector((state: RootState) => state.config.currentBuyVip)

    const handleBuy = () => {
        Toast.loading('加载中...')
        const url = process.browser ? '/app' : process.env.api_url
        const token = localStorage.getItem('_t')
        window.location.href = `${url}/member/vipBuy/${currentBuyVip.vipId}/${token}`
        Toast.hide()
        // MemberApi.vipBuy(currentBuyVip.vipId).then(res => {
        //     Toast.hide()
        //     dispatch({ type: 'SET_BUY_VIP_MODAL', payload: { showBuyVip: false } })
        //     dispatch(getInfo())
        // })
    }

    return (
        <div 
            onClick={() => dispatch({ type: 'SET_BUY_VIP_MODAL', payload: { showBuyVip: false } })}
            className="w-full h-full fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur flex justify-center items-center">
            <div 
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation()
                }}
                className="w-4/5 sm:w-96 bg-white dark:bg-black rounded-lg p-4">
                <h1 className="text-center text-lg text-black dark:text-gray-200 pb-2">购买信息</h1>
                <div className="flex py-1">
                    <div className="w-20 dark:text-gray-200">VIP时长：</div>
                    <div className="flex-1 text-right text-gray-600">{currentBuyVip.validDays}天</div>
                </div>
                <div className="flex py-1">
                    <div className="w-20 dark:text-gray-200">价格：</div>
                    <div className="flex-1 text-right text-gray-600">¥{currentBuyVip.price}</div>
                </div>
                <div 
                    className="my-3 bg-gray-200 dark:bg-gray-800" 
                    style={{height: '1px'}}>
                 </div>
                <div className="flex justify-center text-lg mb-3">
                    <div className="dark:text-white">合计支付：</div>
                    <div className="text-yellow-500 font-bold">{currentBuyVip.price}元</div>
                </div>
                <ButtonCom text="支付" onClick={handleBuy}/>
            </div>
        </div>
    )
}

export default BuyVipModal