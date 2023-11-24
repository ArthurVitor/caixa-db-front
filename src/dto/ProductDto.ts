export default interface Product {
    id: number;
    name: string;
    price: number;
    barcode: string;
    isDiscontinued: boolean;
    discontinuationDate: Date | null;
} 