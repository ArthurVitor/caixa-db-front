import PaymentMethod from "../dto/PaymentMethodDto";

export default class PaymentMethodService {
    
    public static async getAllPaymentMethods(): Promise<PaymentMethod[]> {
        return fetch(`${import.meta.env.VITE_API_URL}/paymentmethod`).then(res => res.json());
    }

}