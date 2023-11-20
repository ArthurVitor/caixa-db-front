import Sale from "../dto/SaleDto";

export default class SaleService {
  public static async getSales(): Promise<Sale[]> {
    return fetch(`${import.meta.env.VITE_API_URL}/sales`).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log([]);
      }
    });
  }

  public static async getSaleById(id: number): Promise<Sale> {
    return fetch(`${import.meta.env.VITE_API_URL}/sales/${id}`).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Sale not found");
      }
    });
  }
}
