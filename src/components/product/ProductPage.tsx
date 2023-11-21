import "../../App.css"
import "./ProductPage.css"

import { useEffect, useState } from "react";
import CustomPaginationActionsTable from "./Table";
import ProductService from "../../services/ProductService";

export function ProductPage() {

  const [productList, setProductList] = useState<object[]>([]);

  useEffect(() => {

    ProductService.getProducts().then(data => {
      setProductList(data)
    })
  }, []);
  
  return (
    <CustomPaginationActionsTable productList={productList}/>
  );
}
