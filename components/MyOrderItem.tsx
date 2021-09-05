import Order from "../types/Order"

type MyOrderItemProps = {
    order: Order
}

function MyOrderItem({ order }: MyOrderItemProps) {
    return (
        <div className="">
            { order.orderId }
        </div>
    )
}

export default MyOrderItem