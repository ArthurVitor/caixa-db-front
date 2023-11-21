import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BasicCard() {
  return (
    <Card sx={{width: 250, height: 250, backgroundColor: "#FAFAF5", border: "2px solid #E6E6E6", borderRadius: 5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20, marginBottom:15, fontFamily:'arial', fontWeight: 400, color: "#374151" }} color="text.secondary" gutterBottom>
          Caixa 01
        </Typography>
        
        <Typography variant="body2">
          <span style={{fontSize: 20, color: "#426B1F", fontWeight: 'bolder'}}>Sub Total: $12,49</span>
          <br />
          <span style={{fontFamily: "arial", fontSize: 18}}>Aberto desde: 14/08/2006</span>
        </Typography>
      </CardContent>
      
    </Card>
  );
}
