import React, { useState } from 'react';
import { Autocomplete, TextField, Select, MenuItem, FormControl, Input } from "@mui/material";
import * as toastr from 'toastr'
import {Button} from 'react-bootstrap';
export default function CreateReport(props) {

    let init = new Date()
    init.setHours(init.getHours() - 3);
    init = init.toISOString().split('T')[0];

    const [dataInicio, setDataInicio] = useState(init)
    const [dataFim, setDataFim] = useState(init)

    const setCorrectDataInicio = (event) => {
        setDataInicio(event.target.value);
    }

    const setCorrectDataFim = (event) => {
        setDataFim(event.target.value);
    }

    const generateReport = () => {
        let inicio= new Date(dataInicio);
        let fim = new Date(dataFim);
        if(inicio > fim){
            toastr.error("Período inválido", "Erro");
            return false;
        }

    }

    return <>
        <div className='ta-center mt-4'>
            <TextField type="date" label="Início do Período" defaultValue={dataInicio} onChange={(event) => setCorrectDataInicio(event)} />
            <TextField type="date" className="" label="Fim do Período" defaultValue={dataFim} onChange={(event) => setCorrectDataFim(event)} />
            <Button variant="primary" onClick={() => generateReport()}>Gerar</Button>
        </div>

    </>
}