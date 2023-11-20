import ItemSell from "../../dto/ItemSellDto";
import ItemSellService from "../../services/ItemSellService"
import { useEffect, useState } from 'react';

export function ItemSellPage() {
    const [sales, setSales] = useState<ItemSell[]>([]);

    useEffect(() => {
        ItemSellService.getAllSales().then(res => setSales(res));
    }, []);

    return (
        <div className="content">
            <p>Item Sell</p>
            <ul>
                {sales.map(sale => (
                    <li key={sale.id}>{sale.quantity}</li>
                ))}
            </ul>
        </div>
    );
}