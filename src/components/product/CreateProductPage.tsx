import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import ProductService from '../../services/ProductService';
import { useNavigate } from 'react-router-dom';

export default function CreateProductPage() {

    const navigate = useNavigate()

    const [product, setProduct] = React.useState<object>({
        name: "",
        price: 0,
        barcode: ""
    });

    function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        setProduct({
            ...product,
            name: e.target?.value,
        });
        
    }
    function handleChangePrice(e: React.ChangeEvent<HTMLInputElement>) {
        setProduct({
            ...product,
            price: Number(e.target?.value),
        });
    }
    function handleChangeBarcode(e: React.ChangeEvent<HTMLInputElement>) {
        setProduct({
            ...product,
            barcode: e.target?.value,
        });
    }

    function handleSubmit() {
        ProductService.createProduct(product)
            .then(data => {
                if(data) {
                    return navigate("/produtos");
                } else {
                    alert("Erro ao criar produto!");
                }
            })
    }

  return (
    <>
        <p>Adicionar novo produto</p>
        <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 3, width: '25ch' },
        }}
        autoComplete="off"
        >
        <div>
            <TextField onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChangeName(e);
            }}
            required
            id="outlined-required"
            label="Name"
            defaultValue=""
            className="name"
            />
            <TextField onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChangePrice(e);
            }}
            required
            id="outlined-required"
            label="Price"
            defaultValue=""
            />
            <TextField onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChangeBarcode(e);
            }}
            required
            id="outlined-required"
            label="Barcode"
            defaultValue=""
            />
        </div>
        </Box>
        <Button onClick={() => {
            handleSubmit()
        }} className="custom-button-toggled">Criar</Button>
    </>
  );
}
