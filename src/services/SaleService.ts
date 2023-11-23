import CashierDto from "../dto/CashierDto";
import Sale from "../dto/SaleDto";
import DateUtils from "../utils/DateUtils";

export default class SaleService {
  public static async getSales(page: number = 1, itemsPerPage: number = 20): Promise<Sale[]> {
    return fetch(`${import.meta.env.VITE_API_URL}/sales/?page=${page}&itemsPerPage=${itemsPerPage}`).then(response => {
      if (response.ok) {
        return response.json().then(sales => sales.map((sale: any) => {
          return {...sale, saleDate: DateUtils.getFormattedDateFromString(sale.saleDate)}
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

  public static async deleteSaleById(id: number): Promise<void> {
    fetch(`${import.meta.env.VITE_API_URL}/cashiers/removeSale/${id}`, {
      method: "DELETE",
    });
  }

  public static async createSale(sale: Sale, cashierId: number): Promise<void> {
    let date = new Date();
    fetch(`${import.meta.env.VITE_API_URL}/cashiers/addSale/${cashierId}`, {
      body: JSON.stringify({
        items: sale.items?.map((item) => {
          return {
            ...item,
            product: {
              id: item.product?.id
            }
          }
        }),
        saleDate: DateUtils.getFormattedDate(date) + " " + DateUtils.getFormattedTime(date),
        paymentMethod: {id: sale.paymentMethod?.id},
        paidAmount: sale.paidAmount,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }
}
