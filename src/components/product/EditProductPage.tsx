import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import ProductService from '../../services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';
import Product from '../../dto/ProductDto';

export default function EditProductPage() {
    
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate()

  const [product, setProduct] = React.useState<Product>({
    id: NaN,
    name: "",
    price: 0,
    barcode: "",
    discontinuationDate: null
  });

  React.useEffect(() => {
    ProductService.getProductById(Number(id)).then(data => 
      setProduct(data)
    )
  }, [id])

  function handleChangeName(e: React.ChangeEvent) {
    
    setProduct({
      ...product,
      name: e.target.value,
    });
    console.log(product);
      
  }

  function handleChangePrice(e: React.ChangeEvent) {
    setProduct({
      ...product,
      price: Number(e.target.value),
    });
  }

  function handleChangeBarcode(e: React.ChangeEvent) {
    setProduct({
      ...product,
      barcode: e.target.value,
    });
  }

  // function handleChangeDescontinuate(e: React.ChangeEvent) {
  //   if(e.target.checked) {
  //     setProduct({
  //       ...product,
  //       discontinuationDate: new Date(),
  //     })
  //   }
  //   console.log(product);
  // }

  function handleSubmit() {
    ProductService.editProduct(Number(id), product)
      .then(data => {
        
        if(data) {
          return navigate("/produtos");
        } else {
          alert("Erro ao editar produto!");
        }
      })
  }

  return (
    <>
      <p style={{ marginLeft: "24px" }}>Adicionar novo produto</p>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 3, width: '25ch' },
      }}
      autoComplete="off"
      >
        <div>
          <TextField onChange={(e) => {
            handleChangeName(e);
          }}
          required
          id="outlined-required"
          label="Name"
          defaultValue={product.name}
          className="name"
          />
          <TextField onChange={(e) => {
            handleChangePrice(e);
          }}
          required
          id="outlined-required"
          label="Price"
          defaultValue={product.price}
          />
          <TextField onChange={(e) => {
            handleChangeBarcode(e);
          }}
          required
          id="outlined-required"
          label="Barcode"
          defaultValue={product.barcode}
          />
          {/* <FormControlLabel style={ { display: 'block', marginLeft: "12px" } }
          control={<Checkbox onChange={(e) => {
            handleChangeDescontinuate(e);
          }}/>}
          label="Descontinuar o produto"
          /> */}
        </div>
      </Box>
      <Button style={{ marginLeft: "24px", marginTop: "24px" }} onClick={() => {
        handleSubmit()
      }} className="custom-button-toggled">
        Editar
      </Button>
    </>
  );
}
