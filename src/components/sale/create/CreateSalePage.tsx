import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import CashierService from "../../../services/CashierService";
import CashierDto from "../../../dto/CashierDto";
import Product from "../../../dto/ProductDto";
import ProductService from "../../../services/ProductService";
import ItemSell from "../../../dto/ItemSellDto";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PaymentMethod from "../../../dto/PaymentMethodDto";
import PaymentMethodService from "../../../services/PaymentMethodService";

import './style.css'
import SaleService from "../../../services/SaleService";

interface Column {
    id: "product" | "quantity" | "unit-price" | "total-price";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }

const columns: Column[] = [
    { id: "product", label: "Produto", minWidth: 70 },
    { id: "quantity", label: "Quantidade", minWidth: 30 },
    { id: "unit-price", label: "Preço unitário", minWidth: 70 },
    { id: "total-price", label: "Preço total", minWidth: 70 },
];

export default function CreateSalePage() {
    let id = Number(useParams()["id"]);
    
    const [loading, setLoading] = useState(true);

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([{id: 1, name: "Pix"}]); // [1
    const [products, setProducts] = useState<Product[]>([]); // [1
    const [cashier, setCashier] = useState<CashierDto>();

    const [productSearch, setProductSearch] = useState<string>(""); // 2
    const [items, setItems] = useState<ItemSell[]>([]); // 3
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null); // 4
    const [paidAmount, setPaidAmount] = useState<number>(0); // 5

    const handleSubmit = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!cashier || !paymentMethod || !items.length) {
            event.preventDefault();
            return;
        }

        SaleService.createSale({
            paymentMethod: paymentMethod!,
            items,
            paidAmount
        }, cashier!.id);

        // window.location.href = "/caixas/" + cashier!.id;
    }

    const handleAddItem = (item: string | null) => {
        setProductSearch("");

        if (!item || !products.find((product) => product.name === item)) return;

        let newSell = items.find((sell) => sell.product!.name === item);

        if (newSell) {
            newSell.quantity += 1;
            setItems([...items]);
            return;
        }

        setItems([...items, {product: products.find((product) => product.name === item), quantity: 1, discount_amount: 0}]);
    }

    const handlePaymentMethodChange = (item: string | null) => {
        setPaymentMethod(paymentMethods.find((paymentMethod) => paymentMethod.name === item) || null);
    }
    
    useEffect(() => {
        // Promise.all para executar duas promises de forma paralela
        Promise.all([ CashierService.getById(id), ProductService.getProducts(), PaymentMethodService.getAllPaymentMethods() ]).then(([cashier, products, paymentMethods]) => {
            setCashier(cashier);
            setProducts(products);
            setPaymentMethods(paymentMethods);
            setLoading(false);
        });
    }, []);

    useEffect(() => {}, [items, productSearch, paymentMethod]);

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <Grid container spacing={2} style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
            <Grid item xs={12} md={8} mt={2}>
                <h1>NOVA VENDA</h1>
            </Grid>
            <Grid item xs={12} md={8} mt={2}>
                <Autocomplete
                freeSolo
                value={productSearch}
                onChange={(_event, newValue) => handleAddItem(newValue)}
                id="free-solo-2-demo"
                options={products.map((product) => product.name)}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Adicionar item"
                    InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    }}
                />
                )} />
            </Grid>
            <Grid item xs={12} md={8} mt={2}>
                <TableContainer sx={{ maxHeight: "100%" }}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ top: 57, minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                            ))}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell key={"product"}>{item.product?.name}</TableCell>
                                        <TableCell key={"quantity"} style={{padding: "20px"}}>
                                            <button style={{marginRight: "7px"}} 
                                            onClick={() => {
                                                    item.quantity -= 1; if (item.quantity <= 0) {
                                                    setItems([...items.filter((_, i) => i !== index)]);
                                                } else {
                                                    setItems([...items]);
                                                }
                                            }}>
                                                -
                                            </button>
                                            {item.quantity}
                                            <button style={{marginLeft: "7px"}} onClick={() => {item.quantity += 1; setItems([...items])}}>
                                                +
                                            </button>
                                        </TableCell>
                                        <TableCell key={"unit-price"}>R$ {item.product?.price.toFixed(2).replace(".", ",")}</TableCell>
                                        <TableCell key={"total-price"}>R$ {(item.product!.price * item.quantity).toFixed(2).replace(".", ",")}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} md={8} mt={2}>
                <h3>Total: R$ {items.reduce((acc, item) => acc + item.product!.price * item.quantity, 0).toFixed(2).replace(".", ",")}</h3>
                <h3>Troco: R$ {items.reduce((acc, item) => acc + item.product!.price * item.quantity, 0).toFixed(2).replace(".", ",")}</h3>
                <FormControl sx={{ m: 1, width: '100%', flexDirection: "row" }}>
                    <Autocomplete
                    style={{width: "20%", marginRight: "20px", marginTop:"10px", marginBottom: "20px"}}
                    freeSolo
                    value={productSearch}
                    onChange={(_event, newValue) => handlePaymentMethodChange(newValue)}
                    id="free-solo-2-demo"
                    options={paymentMethods.map((paymentMethod) => paymentMethod.name)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Método de pagamento"
                        InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        }}
                    />
                    )} />
                    <div>
                        <InputLabel htmlFor="standard-adornment-amount" style={{left: "20%"}}>Total pago</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            onChange={(event) => setPaidAmount(Number(event.target.value))}
                        />
                    </div>
                    <Button variant="contained" component={Link} to={"/caixas/" + cashier!.id} onClick={(event) => handleSubmit(event)} style={{height: "70%",marginTop: "auto", marginBottom:"auto", marginLeft: "30px"}}>Finalizar venda</Button>
                </FormControl>
            </Grid>
        </Grid>
    )
}