
interface QuantityProps {
    quantity: number;
    onClickMinus: (event: React.MouseEvent) => void;
    onClickPlus: (event: React.MouseEvent) => void;
}

export default function QuantityAmountButton({ quantity, onClickMinus, onClickPlus }: QuantityProps) {
    return (
        <>
            <button style={{marginRight: "7px"}} onClick={(event) => onClickMinus(event)}>-</button>
            {quantity}
            <button style={{marginLeft: "7px"}} onClick={(event) => onClickPlus(event)}>+</button>
        </>
    )
}