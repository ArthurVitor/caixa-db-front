import React, { useState } from 'react';

import { Input, InputAdornment } from '@mui/material';

interface CurrencyInputProps {
    onChange: (value: number) => void;
}

export default function CurrencyInput({ onChange }: CurrencyInputProps) {
    const [paidAmount, setPaidAmount] = useState<{formatedValue: string, numericValue: number}>({formatedValue: "0,00", numericValue: 0});

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let numericValue = Number(event.target.value.replace(",", ".")) * 10;

        if (numericValue === paidAmount.numericValue * 10) {
            numericValue /= 100;
        }

        let formattedValue = numericValue.toFixed(2).replace(".", ",");
        onChange(numericValue);
        setPaidAmount({formatedValue: formattedValue, numericValue: numericValue});
    }

    const handleCurrencyBackspace = (event: React.KeyboardEvent) => {
        if (event.keyCode == 8) {
            let numericValue = paidAmount.numericValue / 10;
            let formattedValue = numericValue.toFixed(2).replace(".", ",");
            setPaidAmount({formatedValue: formattedValue, numericValue: numericValue});
            onChange(numericValue);
            event.preventDefault();
        }
    }
    return (
        <>
            <Input
                id="standard-adornment-amount"
                startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                value={paidAmount.formatedValue}
                onChange={(event) => handleCurrencyChange(event)}
                onKeyDown={(event) => handleCurrencyBackspace(event)}
            />
        </>
    )
}