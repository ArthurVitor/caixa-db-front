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
import StepContent from '@mui/material/StepContent';



interface BasicCardProps {
    cashier: CashierDto;
  }


  const steps = [
    {
      label: 'Select campaign settings',
      description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: 'Create an ad group',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
      label: 'Create an ad',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];




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
          <span style={{fontSize: 20, color: "#426B1F", fontWeight: 'bolder'}}>Sub Total: ${subTotal}</span>
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

    <div style={{width: 350, height: 400, border:'none', display: 'flex', alignItems: 'center'}}>
       <Box sx={{ maxWidth: 400 }}>
        <Stepper orientation="vertical">
            {steps.map((step) => (
            <Step key={step.label}>
                <StepLabel>
                {step.label}
                </StepLabel>
                <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                </Box>
                </StepContent>
            </Step>
            ))}
        </Stepper>
    </Box>
    </div>
     </div>

  );


}