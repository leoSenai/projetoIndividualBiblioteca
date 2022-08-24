import React, { useState } from 'react';
import { Autocomplete, TextField, Select, MenuItem, FormControl, Input } from "@mui/material";
import * as toastr from 'toastr'
import {Button} from 'react-bootstrap';
import { jsPDF } from 'jspdf'

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

    const generateReport = async () => {
        let inicio= new Date(dataInicio);
        let fim = new Date(dataFim);
        if(inicio > fim){
            toastr.error("Período inválido", "Erro");
            return false;
        }
        let anterior = document.getElementById("toprint")
        if(anterior != null){
            document.body.removeChild(anterior);
        }
        let corpo = document.createElement('div')
        corpo.className = 'toprint';
        corpo.id = 'toprint';
        /** HEADER **/
        let header = document.createElement('div')
        header.className = 'ta-center';
        let img = document.createElement('img');
        img.src = '../';
        img.className = 'imgHeaderRelatorio'
        let text = document.createElement('div');
        text.innerHTML = `<p style="margin-top:0.5rem;">Relatório: Empréstimos e Multas</p>
        <p>Periodo: ${inicio.toLocaleDateString('pt-BR')} - ${fim.toLocaleDateString('pt-BR')}</p>`;
        header.appendChild(img);
        header.appendChild(text);
        corpo.appendChild(header);
        document.body.appendChild(corpo);
        window.print();
        // frame.document.open();
        // frame.document.write(corpo.innerHTML);
        // frame.document.close();
        // frame.focus();

    }


    return <>
        <div className='ta-center mt-4'>
            <TextField type="date" className="me-3" label="Início do Período" defaultValue={dataInicio} onChange={(event) => setCorrectDataInicio(event)} />
            <TextField type="date" className="me-3" label="Fim do Período" defaultValue={dataFim} onChange={(event) => setCorrectDataFim(event)} />
            <Button variant="primary" onClick={() => generateReport()}>Gerar</Button>
        </div>
        <iframe id="frame" style={{height:"0px", width: "0px", position: "absolute"}}></iframe>

    </>
}