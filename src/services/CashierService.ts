import Cashier from "../dto/CashierDto";

export default class CashierService {
    public static async getAll(): Promise<Cashier[]> {
        return fetch (`http://localhost:8080/api/cashiers/all`).then(response => {
            if (response.ok) {
                return response.json().then((cashiers) => 
                cashiers.map((cashier: any) => ({
                   ...cashier, 
                   openDate: CashierService.getFormattedDate(cashier.openDate)
                }))
                );
            } else {
                throw new Error("Erro service"); 
            }
        });
    }

    public static async getById(id: number): Promise<Cashier> {
        return fetch(`http://localhost:8080/api/cashiers/${id}`).then(response => {
            if(response.ok) {
                return response.json().then((cashier) => ({ 
                    ...cashier, 
                    openDate: CashierService.getFormattedDate(cashier.openDate)
            }) 
            );
            } else {
                throw new Error(); 
            }
        }); 
    }

    public static async getByIsOpen(isOpen: boolean): Promise<Cashier[]> {
        return fetch(`http://localhost:8080/api/cashiers/isOpen/${isOpen}`).then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error(); 
            }
        });
    }
    
    public static async getTotal(id: number):Promise<number> {
        return fetch(`http://localhost:8080/api/cashiers/totalSales/${id}`).then(response => {
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
        return fetch(`http://localhost:8080/api/cashiers/close/${id}`).then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error("Service"); 
            }
        }); 
    }
}