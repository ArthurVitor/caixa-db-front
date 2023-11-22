import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Button } from "@mui/material";

import Sale from "../../dto/SaleDto";
import SaleService from "../../services/SaleService";
import TableTemplate, { Column } from "./templates/TableTemplate";
  
const columns: Column[] = [
{ id: "id", label: "Número", minWidth: 20 },
{ id: "product", label: "Produto", minWidth: 90 },
{ id: "amount", label: "Quantidade", minWidth: 90},
{ id: "subTotal", label: "Subtotal", minWidth: 70 }
];

export default function SalesDetailsPage() {
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
            console.log(sale);
        });
    }, []);

    useEffect(() => {}, [sale?.items])

    const handleDeleteSale = (event: React.MouseEvent) => {
        event.preventDefault();

        SaleService.deleteSaleById(id).then(() => {
            nagivate("/vendas/");
        });
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
                        <TableTemplate columns={columns}/>
                        <TableBody>
                            {sale.items!
                                .map((item, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            <TableCell key="id">{item.id}</TableCell>
                                            <TableCell key="product">{item.product!.name}</TableCell>
                                            <TableCell key="amount">{item.quantity}</TableCell>
                                            <TableCell key="subTotal">R$ {(item.product!.price * item.quantity).toFixed(2).replace(".", ",")}</TableCell>
                                        </TableRow>
                                    );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
}