import CashierCard from "./CashierCard";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export function CashierPage() {
  const cardContainerStyle = {
    height: '100%', // Define a altura para 100% do contêiner pai
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const, // Alinha os itens no centro verticalmente
    justifyContent: 'center' as const, // Alinha os itens no centro horizontalmente
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* No modo mobile (xs), cada item ocupará 12 colunas */}
        <Grid item xs={12} sm={6} md={4}>
          <div style={cardContainerStyle}>
            <CashierCard />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={cardContainerStyle}>
            <CashierCard />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={cardContainerStyle}>
            <CashierCard />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
