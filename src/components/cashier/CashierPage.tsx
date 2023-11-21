import React, { useState, useEffect } from 'react';
import CashierCard from "./CashierCard";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ToggleButton from "./ToggleButtons";
import CashierService from '../../services/CashierService';
import CashierDto from '../../dto/CashierDto';


export function CashierPage() {

  const [isSingleCashierMode, setSingleCashierMode] = useState(false);
  const [cashiers, setCashiers] = useState<CashierDto[]>([]);

  const cardContainerStyle = {
    height: '100%', // Define a altura para 100% do contêiner pai
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const, // Alinha os itens no centro verticalmente
    justifyContent: 'center' as const, // Alinha os itens no centro horizontalmente
  };

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
    
    <ToggleButton/>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* No modo mobile (xs), cada item ocupará 12 colunas */}
        {cashiers.map((cashier) => (
        <Grid item xs={12} sm={6} md={4} key={cashier.id}>
          <div style={cardContainerStyle}>
            <CashierCard cashier={cashier} />
          </div>
        </Grid>
        ))}
      </Grid>
    </Box>
    </>
    
  );
}
