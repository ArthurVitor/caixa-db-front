import "../../App.css"
import "./ProductPage.css"

import { useEffect, useState } from "react";
import CustomPaginationActionsTable from "./ProductTable";
import ProductService from "../../services/ProductService";
import Product from "../../dto/ProductDto";

export function ProductPage() {

  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {

    ProductService.getProducts().then(data => {
      setProductList(data)
    })
  }, []);
  
  return (
    <>
      <p>Listando todos os produtos</p>
      <CustomPaginationActionsTable productList={productList}/>
    </>
  );
}
