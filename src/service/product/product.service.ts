export default class ProductService {
  public static async getProducts(): Promise<object[]> {
    return fetch("http://localhost:8080/api/products").then((response) =>
      response.json()
    )
    .catch(err => 
        console.log(err)
    );
  }
}