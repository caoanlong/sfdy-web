import Vip from "../types/Vip"
import Empty from "./Empty"
import VipItem from "./VipItem"

type VipsProps = {
    vipList: Vip[]
}

function Vips({ vipList }: VipsProps) {
    return (
        <>
            { 
                vipList && vipList.length
                    ? vipList.map((vip: Vip) => <VipItem key={vip.vipId} vip={vip}/>)
                    : <Empty />
            }
        </>
    )
}

export default Vips