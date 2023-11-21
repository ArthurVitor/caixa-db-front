import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CashierService from '../../services/CashierService';
import CashierDto from '../../dto/CashierDto';
import { useParams } from 'react-router-dom';
import SingleCashierCard from './SingleCashierCard';
interface CashierDetailsPageProps {}

const CashierDetailsPage: React.FC<CashierDetailsPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [cashier, setCashier] = useState<CashierDto | null>(null);

  const cardContainerStyle = {
    height: '100%', // Define a altura para 100% do contêiner pai
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const, // Alinha os itens no centro verticalmente
    justifyContent: 'center' as const, // Alinha os itens no centro horizontalmente
  };

  useEffect(() => {
    const fetchCashierDetails = async () => {
      try {
        const cashierDetails = await CashierService.getById(Number(id));
        setCashier(cashierDetails);
      } catch (error) {
        console.error('Erro ao obter detalhes do caixa:', error);
      }
    };

    fetchCashierDetails();
  }, [id]);
  
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
        {/* No modo mobile (xs), cada item ocupará 12 colunas */}
        <Grid item xs={12} sm={6} md={4}>
          <div style={cardContainerStyle}>
          {cashier ? <SingleCashierCard cashier={cashier} /> : <p>Carregando...</p>}
          </div>
      </Grid>
    </Box>
    </>
  );
};

export default CashierDetailsPage;
