import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CashierService from '../../services/CashierService';
import CashierDto from '../../dto/CashierDto';

interface BasicCardProps {
  cashier: CashierDto;
}


export default function BasicCard({cashier}: BasicCardProps ) {

  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const fetchSubTotal = async () => {
      try {
        console.log('Antes de chamar getTotal. Cashier ID:', cashier.id);
        const total = await CashierService.getTotal(cashier.id);
        console.log('Depois de chamar getTotal. Total:', total);
        setSubTotal(total);
      } catch (error) {
        console.error('Erro ao obter o total:', error);
      }
    };

    fetchSubTotal();
  }, [cashier.id]);

  return (
    <Card sx={{width: 250, height: 250, backgroundColor: "#FAFAF5", border: "2px solid #E6E6E6", borderRadius: 5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20, marginBottom:15, fontFamily:'arial', fontWeight: 400, color: "#374151" }} color="text.secondary" gutterBottom>
          Caixa  {`${cashier.id}`}
        </Typography>
        <Typography variant="body2">
          <span style={{fontSize: 20, color: "#426B1F", fontWeight: 'bolder'}}>Sub Total: ${subTotal}</span>
          <br />
          <span style={{fontFamily: "arial", fontSize: 18}}>Aberto desde: {(cashier.openDate.getDay() < 10 ? "0" + cashier.openDate.getDay(): cashier.openDate.getDay()) +"/" + cashier.openDate.getMonth() +"/" + cashier.openDate.getFullYear()}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}
