import { useState, useEffect } from 'react';
import CashierCard from "./CashierCard";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ToggleButton from "./ToggleButtons";
import CashierService from '../../services/CashierService';
import CashierDto from '../../dto/CashierDto';
import { useParams, Link } from 'react-router-dom';



export function CashierPage() {
  const [cashiers, setCashiers] = useState<CashierDto[]>([]);
  const { parametroBooleano } = useParams();
  const filtered_cashiers = cashiers.filter(cashier => cashier.open === (parametroBooleano === "true"))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCashiers = await CashierService.getAll();
        setCashiers(allCashiers);
      } catch (error) {
        console.error('Erro ao obter dados dos caixas:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    
    <ToggleButton visibility={parametroBooleano === "true" ? true : false} />
    
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {filtered_cashiers.map((cashier) => (
        <Grid item xs={12} sm={6} md={4} key={cashier.id}>
          <div className='cardContainer'>
            <Link to={`/caixas/${cashier.id}`}> <CashierCard cashier={cashier}/></Link>
          </div>
        </Grid>
        ))}
      </Grid>
    </Box>
    </>
    
  );
}
