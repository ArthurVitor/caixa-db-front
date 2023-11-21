import Sale from "../dto/SaleDto";

export default class SaleService {
  public static async getSales(page: number = 1, itemsPerPage: number = 20): Promise<Sale[]> {
    return fetch(`${import.meta.env.VITE_API_URL}/sales/?page=${page}&itemsPerPage=${itemsPerPage}`).then(response => {
      if (response.ok) {
        return response.json().then(sales => sales.map((sale: any) => {
          return {...sale, saleDate: SaleService.getFormattedDate(sale.saleDate)}
        }));
      } else {
        return []
      }
    });
  }

  public static async getSaleById(id: number): Promise<Sale> {
    return fetch(`${import.meta.env.VITE_API_URL}/sales/${id}`).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return undefined
      }
    })
  }

  public static getFormattedDate(string: string): Date {
    let spaceSplit = string.split(" ");

    let [day, month, year] = spaceSplit[0].split("/");
    let [hour, minute, second] = spaceSplit[1].split(":");

    return new Date(Number(year), Number(month), Number(day), Number(hour), Number(minute), Number(second));
  }
}
