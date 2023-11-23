import { Button } from "@mui/material";
import CashierService from "../../services/CashierService";
import { useState } from "react";
import CashierDto from "../../dto/CashierDto";

export default function CreateButton () {

    function handleSubmit() {
        CashierService.createCashier({
            open: true,
            sales: []
        });
    }

    return (
        <>
        <Button className='custom-button float-r' onClick={() => {handleSubmit()}}>
           Criar
        </Button>
        </>
    );
}