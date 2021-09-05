interface Order {
    orderId: number,
    platform: number,   // 1: jyav 2: fenglou
    memberId: number,
    vipId: number,
    amount: number, // 金额
    type: number, // 1: VIP
    status: number, // 1: submit 2: pending 3: finished
    description: number,
    extraInfo: number,
    createTime: Date,
    updateTime: Date
}

export default Order