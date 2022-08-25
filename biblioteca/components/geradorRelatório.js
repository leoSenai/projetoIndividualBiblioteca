import React, { useState } from 'react';
import { Autocomplete, TextField, Select, MenuItem, FormControl, Input } from "@mui/material";
import * as toastr from 'toastr'
import {Button} from 'react-bootstrap';
import Image from 'next/image'
import logo2 from '../public/logo.jpg'
import Cookies from "universal-cookie";

export default function CreateReport(props) {

    let init = new Date()
    init.setHours(init.getHours() - 3);
    init = init.toISOString().split('T')[0];

    const cookies = new Cookies()
    const access_token = cookies.get('access_token');

    const [dataInicio, setDataInicio] = useState(init)
    const [dataFim, setDataFim] = useState(init)

    const setCorrectDataInicio = (event) => {
        setDataInicio(event.target.value);
    }

    const setCorrectDataFim = (event) => {
        setDataFim(event.target.value);
    }

    const generateReport = async () => {
        console.log(dataInicio, dataFim);

        let inicio= new Date(dataInicio);
        let fim = new Date(dataFim);

        inicio.setHours(inicio.getHours() + 3);
        fim.setHours(fim.getHours() + 3);

        let getOps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "access_token": access_token,
                "inicio": inicio,
                "fim": fim
            }),
        }

        let infos = await fetch(`api/dados/reportData`, getOps);
        // if(quitar.status != 200) {
        //     let msg = await quitar.text()
        //     console.log(msg)
        //     toastr.error(msg, "Erro")
        // } else {
        //     toastr.success('Multa quitada com sucesso', 'Sucesso')
        // }
        console.log(await infos.json());

        if(inicio > fim){
            toastr.error("Período inválido", "Erro");
            return false;
        }
        // let anterior = document.getElementById("toprint")
        // if(anterior != null){
        //     document.body.removeChild(anterior);
        // }
        let corpo = document.getElementById("toprint")
        /** HEADER **/
        let text = document.getElementById("textoCabecalho")
        text.innerHTML = `<p style="margin-top:0.5rem;">Relatório: Empréstimos e Multas</p>
        <p>Periodo: ${inicio.toLocaleDateString('pt-BR')} - ${fim.toLocaleDateString('pt-BR')}</p>`;
        window.print();
    

    }


    return <>
        <div className='ta-center mt-4'>
            <TextField type="date" className="me-3" label="Início do Período" defaultValue={dataInicio} onChange={(event) => setCorrectDataInicio(event)} />
            <TextField type="date" className="me-3" label="Fim do Período" defaultValue={dataFim} onChange={(event) => setCorrectDataFim(event)} />
            <Button variant="primary" onClick={() => generateReport()}>Gerar</Button>
        </div>
        <div className="toprint" id="toprint">
            <div className="ta-center">
                <Image src={logo2} alt="logo" width={70} height={70}/>   
                <div id="textoCabecalho"></div>
            </div>
        </div>

    </>
}