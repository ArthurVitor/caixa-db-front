import PaymentMethod from "./PaymentMethodDto";
import SaleItem from "./SaleItemDto";

export default interface Sale {
    id: number;

    items: SaleItem[];
    paymentMethod?: PaymentMethod;

    paidAmount: number;
    change: number;
    
    saleDate: Date;
}