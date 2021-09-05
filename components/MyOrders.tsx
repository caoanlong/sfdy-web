import Order from "../types/Order"
import Empty from "./Empty"
import MyOrderItem from "./MyOrderItem"

type MyOrdersProps = {
    orderList: Order[]
}

function MyOrders({ orderList }: MyOrdersProps) {

    return (
        <>
            { 
                orderList && orderList.length
                    ? orderList.map((order: Order) => <MyOrderItem key={order.orderId} order={order} />)
                    : <Empty />
            }
        </>
    )
}

export default MyOrders