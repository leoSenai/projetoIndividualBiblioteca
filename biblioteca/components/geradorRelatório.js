import React, { useState } from 'react';
import { Autocomplete, TextField,  Select, MenuItem, FormControl, Input } from "@mui/material";
export default function CreateReport(props) {

    const init = new Date();

    const [dataInicio, setDataInicio] = useState(init)
    const [dataFim, setDataFim] = useState(init)

    console.log(dataInicio)
    return <>
        <TextField type="date" defaultValue={dataInicio}  onChange={(value) => setDataInicio(value)}/>
    </>
}