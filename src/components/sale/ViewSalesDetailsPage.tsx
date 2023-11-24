import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Grid, Paper, Table, TableContainer, Button } from "@mui/material";

import Sale from "../../dto/SaleDto";
import SaleService from "../../services/SaleService";
import TablePreview, { Column } from "./templates/TablePreview";
import TableRows from "./templates/TableRows";
import ItemSell from "../../dto/ItemSellDto";

  
const columns: Column[] = [
    { id: "id", label: "Número", minWidth: 20 },
    { id: "product", label: "Produto", minWidth: 90 },
    { id: "amount", label: "Quantidade", minWidth: 90},
    { id: "subTotal", label: "Subtotal", minWidth: 70 }
];

function transformItemSellToItems(items: ItemSell[]) {
    return items.map((item) => (
        {
            data: [
                {
                    key: "id", value: item.id!.toString()
                },
                {
                    key: "product", value: item.product!.name
                },
                {
                    key: "amount", value: item.quantity.toString()
                },
                {
                    key: "subTotal", value: "R$ " + (item.product!.price * item.quantity).toFixed(2).replace(".", ",")
                }
            ]
        }
    ))
}


export default function ViewSalesDetailsPage() {
    const id = Number(useParams()["id"]);

    const [loading, setLoading] = useState(true);
    const [sale, setSale] = useState<Sale>({});
    const nagivate = useNavigate();

    if (isNaN(id)) {
        return (
            <p>Pedido inválido!</p>
        )
    }

    useEffect(() => {
        SaleService.getSaleById(id).then((sale) => {
            setSale(sale);
            setLoading(false);
        });
    }, []);

    useEffect(() => {}, [sale?.items])

    const handleDeleteSale = (event: React.MouseEvent) => {
        event.preventDefault();

        SaleService.deleteSaleById(id).then(() => setTimeout(() => nagivate("/vendas/"), 200)).catch((error) => console.log(error));
    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <Grid container spacing={2} style={{margin: "2px", padding: "2px", display: "flex", alignItems: "center", justifyContent:"center", flexDirection: "column"}}>
            <h1 style={{margin: "0px"}}>Pedido número #{id}</h1>
            <Button variant="contained" color="error" style={{marginRight: "15px"}} onClick={handleDeleteSale}>DELETAR VENDA</Button>
            <h3 style={{marginTop: "30px"}}>Items do pedido</h3>
            <Paper>
                <TableContainer sx={{ maxHeight: "100%" }}>
                    <Table>
                        <TablePreview columns={columns}/>
                        <TableRows page={0} rowsPerPage={sale.items!.length} items={transformItemSellToItems(sale.items!)} />
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
}