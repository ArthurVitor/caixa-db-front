import Sale from "./sale.tdo";

export default class SaleService {
  public static async getSales(): Promise<Sale[]> {
    return fetch("http://localhost:3000/sales").then((response) =>
      response.json()
    );
  }
}
