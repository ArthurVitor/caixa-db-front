import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CashierDto from '../../dto/CashierDto';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import DateUtils from '../../utils/DateUtils';

interface BasicCardProps {
  cashier: CashierDto;
}


export default function BasicCard({cashier}: BasicCardProps ) {
  return (
    <Card sx={{width: 250, height: 250, backgroundColor: "#FAFAF5", border: "2px solid #E6E6E6", borderRadius: 5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20, marginBottom:15, fontFamily:'arial', fontWeight: 400, color: "#374151" }} color="text.secondary" gutterBottom>
          Caixa  {`${cashier.id}`}
          <InfoRoundedIcon style={{float:"right"}} />
        </Typography>
        <Typography variant="body2">
          <span style={{fontSize: 20, color: "#426B1F", fontWeight: 'bolder'}}>Subtotal: R${cashier.sales.reduce((acc, sales) => (acc + (sales.subTotal ?? 0)), 0).toFixed(2).replace(".", ",")}</span>
          <br />
          <span style={{fontFamily: "arial", fontSize: 18}}>Aberto desde: {(DateUtils.getFormattedDate(cashier.openDate))}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}
