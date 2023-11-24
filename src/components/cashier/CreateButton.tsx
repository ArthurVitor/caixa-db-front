import { Button } from "@mui/material";
import CashierService from "../../services/CashierService";
import {useNavigate } from 'react-router-dom';

export default function CreateButton () {
    const navigate = useNavigate();

    async function handleSubmit() {
       
        const createdCashier = await CashierService.createCashier();
        navigate(`/caixas/true/${createdCashier.id}`);
    }

    return (
        <>
        <Button className='custom-button float-r' onClick={() => {handleSubmit()}}>
           Abrir
        </Button>
        </>
    );
}