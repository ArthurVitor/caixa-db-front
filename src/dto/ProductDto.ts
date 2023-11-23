export default interface Product {
    id: number;
    name: string;
    price: number;
    barcode: string;
    discontinuationDate: Date | null;
} 