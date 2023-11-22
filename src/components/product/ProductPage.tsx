import "../../App.css"
import "./ProductPage.css"

import { useEffect, useState } from "react";
import CustomPaginationActionsTable from "./ProductTable";
import ProductService from "../../services/ProductService";
import Product from "../../dto/ProductDto";
import { Button } from "@mui/material";
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
      <h3>Listando todos os produtos</h3>
      <Button className="custom-button-toggled new-product" onClick={handleClick}>Criar Produto</Button>
      <CustomPaginationActionsTable productList={productList}/>
    </>
  );
}
