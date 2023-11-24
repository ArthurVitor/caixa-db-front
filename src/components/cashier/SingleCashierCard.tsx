import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CashierDto from '../../dto/CashierDto';
import Grid from '@mui/material/Grid';

import "./CashierCSS.css";

import Stepper from '@mui/material/Stepper';
import { palette, PaletteProps} from '@mui/system';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button} from '@mui/material';
import CashierService from '../../services/CashierService';
import DateUtils from '../../utils/DateUtils';

interface BasicCardProps {
  cashier: CashierDto;
}

const Step = styled.div<PaletteProps>`
  ${palette}
`; 

const StepLabel = styled.div<PaletteProps>`
  ${palette}
`;

export default function BasicCard({ cashier }: BasicCardProps) {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await CashierService.closeCashier(cashier.id!);
      navigate('/caixas/false');
    } catch (error) {
      console.error('Erro ao fechar o caixa', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container columnSpacing={{md: 5}}>
      <Card sx={{borderRadius: 5 }} className='card divFlexCenter'>
        <CardContent>
          <Typography sx={{ fontSize: 20, marginBottom: 15, fontFamily: 'arial', fontWeight: 400, color: "#374151" }} color="text.secondary" gutterBottom>
            Caixa {`${cashier.id}`}
          </Typography>
          <Typography variant="body2">
            <span style={{ fontFamily: "arial", fontSize: 18 }}>Aberto desde: {(DateUtils.getFormattedDate(cashier.openDate))} às {(DateUtils.getFormattedTime(cashier.openDate))}</span>
            <br />
            <span style={{ fontSize: 20, color: "#426B1F", fontWeight: 'bolder' }}>Sub Total: ${cashier.sales.reduce((acc, sales) => (acc + (sales.subTotal ?? 0)), 0).toFixed(2)}</span>
          </Typography>
          <Link to={`/vendas/${cashier.id}/criar-venda`}>
            <Button style={{ marginTop: 40 }} className="custom-button-toggled">Adicionar venda</Button>
          </Link>
        </CardContent>
      </Card>
      <div className='verticalHr'></div>
      <div className='history'>
        <Box p={4} className='boxSize'>
        <Grid >
          <div className='movimentacao'>
            Movimentação
          </div>
          <div className='scroll'>
          <Stepper orientation="vertical">
            {cashier.sales.map((sale) => (
              <Link to={`/vendas/${sale.id}`} style={{ textDecoration: "none" }} key={sale.id}>
                <Step color="#374151">
                  <StepLabel>
                  <div className='divFlexCenter'>
                   <div className='divLineHistory' />
                    <p id="paymentMethod">{sale.paymentMethod?.name}</p>
                    </div>
                    <div className="divFlexCenter">
                      <div className="divCircle"></div>
                      {sale.subTotal?.toFixed(2)}
                    </div>
                  </StepLabel>
                </Step>
              </Link>
            ))}
          </Stepper>
          </div>
          </Grid>
          <br></br>
          <div className='valorTotal'>
            <span>Valor total: R${cashier.sales.reduce((acc, sales) => (acc + (sales.subTotal ?? 0)), 0).toFixed(2)}</span>
          </div>
          <div className="d-grid">
            {
              cashier.open ? <Button className="custom-button float-r max-button" onClick={handleClick}>Fechar caixa</Button> : null
            }
          </div>
        </Box>
      </div>
      </Grid>
      </Box>
  );
}