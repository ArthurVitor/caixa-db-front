import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CashierService from '../../services/CashierService';
import CashierDto from '../../dto/CashierDto';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';



interface BasicCardProps {
    cashier: CashierDto;
  }


export default function BasicCard({cashier}: BasicCardProps ) {

  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const fetchSubTotal = async () => {
      try {
        const total = await CashierService.getTotal(cashier.id);
        setSubTotal(total);
      } catch (error) {
        console.error('Erro ao obter o total:', error);
      }
    };

    fetchSubTotal();
  }, [cashier.id]);

  return (
    <div style={{ display: 'flex', gap: '20vh' }}>
    <Card sx={{width: 450, height: 400, backgroundColor: "#FAFAF5", border: "2px solid #E6E6E6", borderRadius: 5 , display: 'flex', alignItems: 'center'}}>
      <CardContent>
        <Typography sx={{ fontSize: 20, marginBottom:15, fontFamily:'arial', fontWeight: 400, color: "#374151" }} color="text.secondary" gutterBottom>
          Caixa  {`${cashier.id}`}
        </Typography>
        <Typography variant="body2">
          <span style={{fontFamily: "arial", fontSize: 18}}>Aberto desde: {(cashier.openDate.getDay() < 10 ? "0" + cashier.openDate.getDay(): cashier.openDate.getDay()) +"/" + cashier.openDate.getMonth() +"/" + cashier.openDate.getFullYear()}</span>
          <br />
          <span style={{fontSize: 20, color: "#426B1F", fontWeight: 'bolder'}}>Sub Total: ${subTotal.toFixed(2)}</span>
        </Typography>
      </CardContent>
    </Card>

        <div
            style={{
            borderLeft: '2px solid #E6E6E6', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90vh',
            }}
        ></div>

    <div style={{width: 400, height: 'auto', border:'none', display: 'flex', alignItems: 'center'}}>
       <Box sx={{ maxWidth: 400 }}>

        <div>
            Movimentação
        </div>


        <Stepper orientation="vertical">
             <Step>
                <StepLabel>
                <span style={{fontFamily: "arial", fontSize: 18}}>Abertura do caixa </span>
                <Box sx={{ mb: 2 }}>
                </Box>  
                </StepLabel>
        </Step>

            {cashier.sales.map((sale) => (
            <Step>
                <StepLabel>
                {sale.subTotal?.toFixed(2)}
                <br></br>
                <p>{sale.paymentMethod?.name}</p>
                <Box sx={{ mb: 2 }}>
                </Box>
                </StepLabel>
            </Step>
            ))}
        </Stepper>
    </Box>
    </div>
     </div>

  );


}