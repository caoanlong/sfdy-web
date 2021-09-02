type CellItemProps = {
    label: string,
    value?: string,
    underLine?: boolean
}

function CellItem({ label, value, underLine=false }: CellItemProps) {
    return (
        <div 
            className="flex" 
            style={{
                height: '50px',
                lineHeight: '50px',
                borderBottom: underLine ? '1px solid #ddd' : 'none'
            }}>
            <div className="w-16 text-black dark:text-gray-400">{label}</div>
            {
                value ? <div className="flex-1 text-right text-gray-400">{value}</div> : <></>
            }
        </div>
    )
}

export default CellItem