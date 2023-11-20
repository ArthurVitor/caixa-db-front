import ItemSell from "../../dto/ItemSellDto";
import ItemSellService from "../../services/ItemSellService"
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export function ItemSellPage() {
    const [sales, setSales] = useState<ItemSell[]>([]);

    useEffect(() => {
        ItemSellService.getAllSales().then(res => setSales(res));
    }, []);

    return (
        <div className="content">
            <p>Item Sell</p>
            <Stack spacing={2} direction="row">
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
            </Stack>
        </div>
    );
}