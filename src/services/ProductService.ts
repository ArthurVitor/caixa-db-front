import Product from "../dto/ProductDto";

export default class ProductService {
  public static async getProducts(): Promise<Product[]> {
    return fetch("http://localhost:8080/api/products").then((response) =>
      response.json()
    )
    .catch(err => 
        console.error(err)
    );
  }

  public static async createProduct(product: object): Promise<Product> {
    const data: string = JSON.stringify(product)
    return fetch("http://localhost:8080/api/product", {
      method: "POST",
      body: data,
      headers: { "Content-type": "application/json" }
    })
    .then(response => response.json())
    .catch(err => console.error(err))
  }
}