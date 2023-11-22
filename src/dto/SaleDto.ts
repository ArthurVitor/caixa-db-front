import PaymentMethod from "./PaymentMethodDto";
import SaleItem from "./ItemSellDto";

export default interface Sale {
    id?: number;

    items: SaleItem[];
    paymentMethod?: PaymentMethod;

    paidAmount?: number;
    change?: number;
    
    saleDate?: Date;
    subTotal?: number;
}