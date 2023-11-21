import "../../App.css"
import "./ProductPage.css"

import { useEffect } from "react";
import { ProductComponent } from "../../components/product-component/ProductComponent";
import CustomPaginationActionsTable from "./Table";

export function ProductPage() {

  // const [productList, setProductList] = useState<object[]>([]);

  useEffect(() => {

    // fetch("http://localhost:8080/api/products", { method: "GET" })
    // .then(response => response.json())
    // .then(data => {
    //   for(const p of data) {
    //     setProductList(
    //       [...productList, p])
    //   }
    // })
  }, []);
  
  return (
    // <div className="product-page-content">
    //   <ProductComponent product={{id: 1, name:"Ovo", price: 0.50, barcode: "7777777777777", descontinuation_date: null}} key={1}/>
    //   <ProductComponent product={{id: 1, name:"Suco", price: 4.75, barcode: "8888888888888", descontinuation_date: null}} key={2}/>
    //   <ProductComponent product={{id: 1, name:"Pão", price: 0.50, barcode: "9999999999999", descontinuation_date: null}} key={3}/>
    // </div>
    <CustomPaginationActionsTable/>
  );
}
