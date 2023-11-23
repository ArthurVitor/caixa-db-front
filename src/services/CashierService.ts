import Cashier from "../dto/CashierDto";
import DateUtils from "../utils/DateUtils";

export default class CashierService {
    public static async getAll(): Promise<Cashier[]> {
        return fetch (`${import.meta.env.VITE_API_URL}/cashiers/all`).then(response => {
            if (response.ok) {
                return response.json().then((cashiers) => 
                    cashiers.map((cashier: any) => ({
                    ...cashier, 
                    openDate: DateUtils.getFormattedDateFromString(cashier.openDate)
                    }))
                );
            } else {
                throw new Error("Erro service"); 
            }
        });
    }

    public static async getById(id: number): Promise<Cashier> {
        return fetch(`${import.meta.env.VITE_API_URL}/cashiers/${id}`).then(response => {
            if(response.ok) {
                return response.json().then((cashier) => ({ 
                    ...cashier, 
                    openDate: DateUtils.getFormattedDateFromString(cashier.openDate)
                }) 
            );
            } else {
                throw new Error(); 
            }
        }); 
    }

    public static async getByIsOpen(isOpen: boolean): Promise<Cashier[]> {
        return fetch(`${import.meta.env.VITE_API_URL}/cashiers/isOpen/${isOpen}`).then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error(); 
            }
        });
    }
    
    public static async getTotal(id: number):Promise<number> {
        return fetch(`${import.meta.env.VITE_API_URL}/cashiers/totalSales/${id}`).then(response => {
            if(response.ok) {
                return response.json();
            } else {
                console.error('Erro ao obter o total:',response.statusText);
                throw new Error("Erro service"); 
            }
        });
    }


    public static getFormattedDate(string: string): Date {
        let spaceSplit = string.split(" ");

        let [day, month, year] = spaceSplit[0].split("/");
        let [hour, minute, second] = spaceSplit[1].split(":");
    
        return new Date(Number(year), Number(month), Number(day), Number(hour), Number(minute), Number(second));
      }
    

      public static async closeCashier(id:number): Promise<void> {
        return fetch(`${import.meta.env.VITE_API_URL}/cashiers/close/${id}`).then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error("Service"); 
            }
        }); 
    }

    public static async createCashier(cashier: Cashier): Promise<Cashier> {
        let date = new Date();
        return fetch(`${import.meta.env.VITE_API_URL}/cashiers/save`, {
            body: JSON.stringify({
                openDate: DateUtils.getFormattedDate(date) + " " + DateUtils.getFormattedTime(date),
                isOpen:true
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`Error. Status: ${response.status}`);
            }
            return response.json();
        })
    }
}