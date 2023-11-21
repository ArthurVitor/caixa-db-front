import Product from "../dto/ProductDto";

export default class ProductService {
  public static async getProducts(): Promise<Product[]> {
    return fetch("http://localhost:8080/api/products").then((response) =>
      response.json()
    )
    .catch(err => 
        console.log(err)
    );
  }
}