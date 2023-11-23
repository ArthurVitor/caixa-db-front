import Product from "../dto/ProductDto";

export default class ProductService {
  public static async getProducts(): Promise<Product[]> {
    return fetch(`${import.meta.env.VITE_API_URL}/products`).then((response) =>
      response.json()
    )
    .catch(err => 
        console.error(err)
    );
  }

  public static async getProductById(id: number): Promise<Product> {
    return fetch(`${import.meta.env.VITE_API_URL}/product/${id}`).then(response => 
      response.json()
    )
    .catch(err => console.error(err))
  }

  public static async getProductByBarcode(barcode: string): Promise<Product> {
    return fetch(`${import.meta.env.VITE_API_URL}/product?barcode=${barcode}`).then(response => 
      response.json()
    )
    .catch(err => console.error(err))
  }

  public static async createProduct(product: object): Promise<Product> {
    const data: string = JSON.stringify(product)
    return fetch(`${import.meta.env.VITE_API_URL}/product`, {
      method: "POST",
      body: data,
      headers: { "Content-type": "application/json" }
    })
    .then(response => response.json())
    .catch(err => console.error(err))
  }

  public static async editProduct(id: number, data: object): Promise<string> {
    const putData: string = JSON.stringify(data);
    return fetch(`${import.meta.env.VITE_API_URL}/product/${id}`, {
      method: "PUT",
      body: putData,
      headers: { "Content-type": "application/json" }
    })
    .then(response => response.json())
    .catch(err => console.error(err))
  }

  public static async deleteProduct(id: number): Promise<number | void> {
    return fetch(`${import.meta.env.VITE_API_URL}/product/${id}`, {
      method: "DELETE"
    }).then(response =>
      response.status
    )
    .catch(err => console.error(err))
  }
}