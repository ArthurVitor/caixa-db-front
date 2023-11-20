export function ProductComponent(props: { product: object }) {

    return (
        <div className="product-content">
            <h2>{props.product.name}</h2>
            <p>{props.product.price}</p>
        </div>
    );
}