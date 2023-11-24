import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import "./CashierCSS.css"
import { Link } from "react-router-dom";
import CreateButton from "./CreateButton";

type Visibility = true | false;
interface ToggleButtonProps {
    visibility: Visibility;
}

export default function ToggleButton({ visibility }: ToggleButtonProps) {
    return (
        <>
            <Grid container spacing={2} style={{marginBottom:"1rem"}}>
                <Grid item xs={6} md={6}>
                    <Button className={visibility ? "custom-button-toggled float-r" : "custom-button float-r"}>
                        <Link to={"/caixas/true"}>Aberto</Link>
                    </Button>
                </Grid>
                <Grid item xs={6} md={5}>
                    <Button className={visibility ? "custom-button" : "custom-button-toggled float"}>
                        <Link to={"/caixas/false"}>Fechado</Link>
                    </Button>
                </Grid>
                <Grid item md={1} xs={12}>
                    <CreateButton/>
                </Grid>
            </Grid>
        </>
    )
}