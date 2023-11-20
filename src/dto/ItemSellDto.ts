import Product from "./ProductDto";
import Sale from "./SaleDto";

export default interface ItemSell {
    id: number;

    sale?: Sale;

    product?: Product;

    quantity: number;

    discount_amount: number;
} 