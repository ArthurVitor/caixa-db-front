export default class ProductService {
  public static async getProducts(): Promise<object[]> {
    return fetch("http://localhost:8080/sales").then((response) =>
      response.json()
    );
  }
}