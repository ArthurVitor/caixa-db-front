import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import "./CashierCSS.css"

export default function ToggleButton() {
    return (
        <>
            <Grid container spacing={2} style={{marginBottom:"1rem"}}>
                <Grid item xs={6}>
                    <Button className="custom-button float-r">Aberto</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button className="custom-button-toggled">Fechado</Button>
                </Grid>
            </Grid>
        </>
    )
}