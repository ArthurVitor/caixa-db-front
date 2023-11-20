import ItemSell from "../dto/ItemSellDto";

export default class ItemSellService {
    public static async getAllSales(): Promise<ItemSell[]> {
        return fetch(`http://localhost:8080/api/itemsell/all`).then(res => {
            if(res.ok) {
                return res.json()
            } else { 
                return []
            }
        })
    }
}