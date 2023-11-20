import SaleDto from './SaleDto';

export default interface CashierDto {
    id: number, 

    isOpen: boolean;

    openDate: Date;

    closeDate?: Date;
    
    sales: SaleDto[];
}