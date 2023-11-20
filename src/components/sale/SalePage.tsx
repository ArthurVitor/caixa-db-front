import { useEffect } from "react";
import SaleService from "../../services/SaleService";

export function SalePage() {

  useEffect(() => {
    
    SaleService.getSaleById(1).then((response) => {
      console.log(response);
    });

  }, []);

  return (
    <div className="content">
      <p>Página de Sales</p>
    </div>
  );
}
