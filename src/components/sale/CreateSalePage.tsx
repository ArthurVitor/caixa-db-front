import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, FormControl, InputAdornment, InputLabel, Input, TextField, Autocomplete } from "@mui/material";

import QuantityAmountButton from "./templates/QuantityAmountButton";

import CashierService from "../../services/CashierService";
import ProductService from "../../services/ProductService";
import PaymentMethodService from "../../services/PaymentMethodService";
import SaleService from "../../services/SaleService";

import CashierDto from "../../dto/CashierDto";
import Product from "../../dto/ProductDto";
import ItemSell from "../../dto/ItemSellDto";
import PaymentMethod from "../../dto/PaymentMethodDto";
import TablePreview, { Column } from "./templates/TablePreview";
import TableRows from "./templates/TableRows";
import StringUtils from "../../utils/StringUtils";
import CurrencyInput from "./templates/CurrencyInput";

const columns: Column[] = [
    { id: "product", label: "Produto", minWidth: 70 },
    { id: "quantity", label: "Quantidade", minWidth: 30 },
    { id: "unitPrice", label: "Preço unitário", minWidth: 70 },
    { id: "totalPrice", label: "Preço total", minWidth: 70 },
];

function transformItemSellToItems(items: ItemSell[], setItems: (items: ItemSell[]) => void) {
    return items.map((item, index) => (
        {
            data: [
                {
                    key: "product", value: item.product!.name
                },
                {
                    key: "quantity", value: (<QuantityAmountButton quantity={item.quantity} onClickMinus={() => {
                        item.quantity -= 1; if (item.quantity <= 0) {
                            setItems([...items.filter((_, i) => i !== index)]);
                        } else {
                            setItems([...items]);
                        }
                    }} onClickPlus={() => {item.quantity += 1; setItems([...items])}} />)
                },
                {
                    key: "unitPrice", value: "R$ " + item.product!.price.toFixed(2).replace(".", ",")
                },
                {
                    key: "totalPrice", value: "R$ " + (item.product!.price * item.quantity).toFixed(2).replace(".", ",")
                }
            ]
        }
    ))
}

export default function CreateSalePage() {
    let id = Number(useParams()["id"]);
    
    const [loading, setLoading] = useState(true);

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([{id: 1, name: "Pix"}]);
    const [products, setProducts] = useState<Product[]>([]);
    const [cashier, setCashier] = useState<CashierDto>();

    const [productSearch, setProductSearch] = useState<string>("");
    const [items, setItems] = useState<ItemSell[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
    const [paidAmount, setPaidAmount] = useState<number>(0);

    const nagivate = useNavigate();

    const handleSubmit = () => {
        if (items.length === 0) {
            alert("Adicione pelo menos um item!");
            return;
        }

        if (!paymentMethod) {
            alert("Selecione um método de pagamento!");
            return;
        }

        let total = items.reduce((acc, item) => acc + item.product!.price * item.quantity, 0);

        if (paidAmount < total) {
            alert("O cliente precisa pagar mais " + (total - paidAmount).toFixed(2).replace(".", ",") + " para finalizar a compra!");
            return;
        }

        SaleService.createSale({
            paymentMethod: paymentMethod!,
            items,
            paidAmount: 1,
            change: Math.max(0, paidAmount - total)
        }, cashier!.id!)
        .then(() => setTimeout(() => nagivate("/caixas/" + cashier?.open + "/" + cashier!.id), 200));
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
        }).catch(() => nagivate("/caixas/"));
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
                        <TablePreview columns={columns}/>
                        <TableRows page={0} rowsPerPage={items.length} items={transformItemSellToItems(items, setItems)} />
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} md={8} mt={2}>
                <h3>Total: R$ {items.reduce((acc, item) => acc + item.product!.price * item.quantity, 0).toFixed(2).replace(".", ",")}</h3>
                <h3>Troco: R$ {Math.max(0, paidAmount - items.reduce((acc, item) => acc + item.product!.price * item.quantity, 0)).toFixed(2).replace(".", ",")}</h3>
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
                        <CurrencyInput onChange={(value) => setPaidAmount(value)} />
                    </div>
                    <Button variant="contained" onClick={() => handleSubmit()} style={{height: "70%",marginTop: "auto", marginBottom:"auto", marginLeft: "30px"}}>Finalizar venda</Button>
                </FormControl>
            </Grid>
        </Grid>
    )
}