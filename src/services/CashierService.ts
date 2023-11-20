import Cashier from "../dto/CashierDto";

export default class CashierService {
    public static async getAll(): Promise<Cashier[]> {
        return fetch (`${import.meta.env.VITE_API_URL}/cashiers/all`).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(); 
            }
        });
    }

    public static async getById(id: number): Promise<Cashier> {
        return fetch(`${import.meta.env.VITE_API_URL}/cashiers/${id}`).then(response => {
            if(response.ok) {
                return response.json();
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
                throw new Error(); 
            }
        });
    }
    
}