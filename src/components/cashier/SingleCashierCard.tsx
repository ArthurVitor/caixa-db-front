import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CashierDto from '../../dto/CashierDto';
import 'react-toastify/dist/ReactToastify.css';

import "./CashierCSS.css";

import Stepper from '@mui/material/Stepper';
import { palette, PaletteProps, spacing, SpacingProps } from '@mui/system';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import CashierService from '../../services/CashierService';

interface BasicCardProps {
  cashier: CashierDto;
}

const Step = styled.div<PaletteProps & SpacingProps>`
  ${palette}
`;

const StepLabel = styled.div<PaletteProps>`
  ${palette}
`;

const Box = styled.div<PaletteProps & SpacingProps>`
  ${palette}
  ${spacing}
`;

export default function BasicCard({ cashier }: BasicCardProps) {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await CashierService.closeCashier(cashier.id);
      navigate('/caixas');
    } catch (error) {
      console.error('Erro ao fechar o caixa', error);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20vh' }}>
      <Card sx={{ width: 450, height: 400, backgroundColor: "#FAFAF5", border: "2px solid #E6E6E6", borderRadius: 5, display: 'flex', alignItems: 'center' }}>
        <CardContent>
          <Typography sx={{ fontSize: 20, marginBottom: 15, fontFamily: 'arial', fontWeight: 400, color: "#374151" }} color="text.secondary" gutterBottom>
            Caixa {`${cashier.id}`}
          </Typography>
          <Typography variant="body2">
            <span style={{ fontFamily: "arial", fontSize: 18 }}>Aberto desde: {cashier.openDate && (cashier.openDate.getDay() < 10 ? "0" + cashier.openDate.getDay() : cashier.openDate.getDay()) + "/" + cashier.openDate.getMonth() + "/" + cashier.openDate.getFullYear()}</span>
            <br />
            <span style={{ fontSize: 20, color: "#426B1F", fontWeight: 'bolder' }}>Sub Total: ${cashier.sales.reduce((acc, sales) => (acc + (sales.subTotal ?? 0)), 0).toFixed(2)}</span>
          </Typography>
          <Link to={`/vendas/${cashier.id}/criar-venda`}>
            <Button style={{ marginTop: 40 }} className="custom-button-toggled">Adicionar venda</Button>
          </Link>
        </CardContent>
      </Card>
      <div className='verticalHr'></div>
      <div style={{ width: 400, height: 'auto', border: 'none', display: 'flex', alignItems: 'center' }}>
        <Box p={4}>
          <div style={{ height: '100px', color: '#374151', fontWeight: 'bold', fontSize: '20px' }}>
            Movimentação
          </div>
          <Stepper orientation="vertical">
            <Step color="#374151">
              <StepLabel>
                <div className='divFlexCenter'>
                  <div className='divCircle firstCircle'></div>
                  <span style={{ fontFamily: "arial", fontSize: 16, marginBottom: '50px' }}>Abertura do caixa</span>
                </div>
                <Box p={2}></Box>
              </StepLabel>
            </Step>
            {cashier.sales.map((sale) => (
              <Link to={`/vendas/${sale.id}`} style={{ textDecoration: "none" }} key={sale.id}>
                <Step color="#374151">
                  <StepLabel color="#374151">
                    <div className="divFlexCenter">
                      <div className="divCircle"></div>
                      {sale.subTotal?.toFixed(2)}
                    </div>
                    <div className='divLineHistory' />
                    <p>{sale.paymentMethod?.name}</p>
                    <Box p={2}>
                    </Box>
                  </StepLabel>
                </Step>
              </Link>
            ))}
          </Stepper>
          <br></br>
          <div style={{ height: '100px', color: '#374151', fontWeight: 'bold', fontSize: '25px' }}>
            <span>Valor total: R${cashier.sales.reduce((acc, sales) => (acc + (sales.subTotal ?? 0)), 0).toFixed(2)}</span>
          </div>
          <Button style={{ width: '400px' }} className="custom-button float-r" onClick={handleClick}>Fechar caixa</Button>
        </Box>
      </div>
    </div>
  );
}