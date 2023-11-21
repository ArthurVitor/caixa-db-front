export default interface Product {
    
    id: number;

    name: string;

    price: number;

    barcode: string;

    discontinuation_date?: Date;

    get getId(): number;

    get getName(): string;

    set setName(name: string);

    get getPrice(): number;

    set setPrice(price: number);

    get getBarcode(): string;

    set setBarcode(barcode: string);

    get getDiscontinuationDate(): Date;

    set setDiscontinuationDate(date: Date);
}