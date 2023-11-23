import SaleDto from './SaleDto';

export default interface CashierDto {
    id?: number, 

    open: boolean;

    openDate?: Date;

    closeDate?: Date;
    
    sales: SaleDto[];
}