import PaymentMethod from "./paymentmethod.tso";
import SaleItem from "./saleitem.tdo";

export default interface Sale {
    id: number;

    items: SaleItem[];
    paymentMethod?: PaymentMethod;

    paidAmount: number;
    change: number;
    
    saleDate: Date;
}