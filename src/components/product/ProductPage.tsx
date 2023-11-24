import "../../App.css"
import "./ProductPage.css"

import { useEffect, useState } from "react";
import CustomPaginationActionsTable from "./ProductTable";
import ProductService from "../../services/ProductService";
import Product from "../../dto/ProductDto";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function ProductPage() {
  const navigate = useNavigate()
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {

    ProductService.getProducts().then(data => {
      setProductList(data)
    })
  }, []);

  function handleClick() {
    navigate("/produtos/criar-produto")
  }
  
  return (
    <>
      <h3>Listagem de Produtos</h3>
      <CustomPaginationActionsTable productList={productList}/>
      <Button className="custom-button-toggled new-product mt-2" onClick={handleClick}>Criar Produto</Button>
    </>
  );
}
