import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Select, MenuItem, FormControl, Input } from "@mui/material";
import * as toastr from 'toastr'
import { Button } from 'react-bootstrap';
import Image from 'next/image'
import logo2 from '../public/logo.jpg'
import Cookies from "universal-cookie";


export default function CreateReport(props) {

    let init = new Date()
    init.setHours(init.getHours() - 3);
    init = init.toISOString().split('T')[0];

    const cookies = new Cookies()
    const access_token = cookies.get('access_token');
    let clearLayout;
    const [dataInicio, setDataInicio] = useState(init)
    const [dataFim, setDataFim] = useState(init)

    useEffect(() => {
        clearLayout = document.getElementById('toprint').innerHTML;
    }, [])

    const setCorrectDataInicio = (event) => {
        setDataInicio(event.target.value);
    }

    const setCorrectDataFim = (event) => {
        setDataFim(event.target.value);
    }

    const generateReport = async () => {
        console.log(dataInicio, dataFim);

        let inicio = new Date(dataInicio);
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
        if (infos.status != 200) {
            toastr.error("Erro ao consultar dados", "Erro")
            return false;
        }
        let jsonInfos = await infos.json()
        let emprestimos = jsonInfos["dados"][0];
        let multas = jsonInfos["dados"][1];
        if (inicio > fim) {
            toastr.error("Período inválido", "Erro");
            return false;
        }
        // let anterior = document.getElementById("toprint")
        // if(anterior != null){
        //     document.body.removeChild(anterior);
        // }
        //let corpo = document.getElementById("toprint")
        let corpo = document.getElementById("corpo")
        corpo.innerHTML = "";

        //window.print();
        //return false;   
        /** HEADER **/
        let text = document.getElementById("textoCabecalho")
        text.innerHTML = `<p style="margin-top:0.5rem;">Relatório: Empréstimos e Multas</p>
        <p>Periodo: ${inicio.toLocaleDateString('pt-BR')} - ${fim.toLocaleDateString('pt-BR')}</p>`;

        /**BODY EMPRESTIMOS**/
        let tableEmprestimos = document.createElement('table');
        tableEmprestimos.className = 'table table-striped';
        let tableEmprestimosHead = document.createElement('thead');
        let headInner = "<tr> <th colspan='4' class='ttitle'>Empréstimos</th></tr>";
        headInner += "<tr>";
        headInner += "<th  scope='col'>#</th>";
        headInner += "<th  scope='col'>CPF Criança</th>";
        headInner += "<th  scope='col'>Título Livro</th>";
        headInner += "<th  scope='col'>Data Inicio</th>";
        headInner += "</tr>";
        tableEmprestimosHead.innerHTML = headInner;
        let tableEmprestimosBody = document.createElement("tbody");
        let bodyInner = "";
        if (emprestimos.length == 0) {
            bodyInner = "<tr><td colspan='4'> Não há empréstimos neste período</td></tr>"
        }
        for (let i = 0; i < emprestimos.length; i++) {
            let dataFormat = new Date(emprestimos[i].data_inicio);
            bodyInner += "<tr>";
            bodyInner += `<th scope='row'>${i + 1}</th>`
            bodyInner += `<td>${emprestimos[i].cpf}</td>`;
            bodyInner += `<td>${emprestimos[i].titulo}</td>`;
            bodyInner += `<td>${dataFormat.toLocaleDateString('pt-BR')}</td>`;
            bodyInner += "</tr>";
        }
        tableEmprestimosBody.innerHTML = bodyInner;
        tableEmprestimos.appendChild(tableEmprestimosHead);
        tableEmprestimos.appendChild(tableEmprestimosBody);
        corpo.appendChild(tableEmprestimos);

        /**BODY MULTAS**/
        let tableMultas = document.createElement('table');
        tableMultas.className = 'table table-striped';
        let tableMultasHead = document.createElement('thead');
        headInner = "<tr> <th colspan='4' class='ttitle'>Multas</th></tr>";
        headInner += "<tr>";
        headInner += "<th  scope='col'>#</th>";
        headInner += "<th  scope='col'>CPF Criança</th>";
        headInner += "<th  scope='col'>Motivo Multa </th>";
        headInner += "<th  scope='col'>Data Inicio</th>";
        headInner += "</tr>";
        tableMultasHead.innerHTML = headInner;
        let tableMultasBody = document.createElement("tbody");
        bodyInner = "";
        if (multas.length == 0) {
            bodyInner = "<tr><td colspan='4'> Não há multas neste período</td></tr>"
        }
        for (let i = 0; i < multas.length; i++) {
            let dataFormat = new Date(multas[i].data_inicio);
            bodyInner += "<tr>";
            bodyInner += `<th scope='row'>${i + 1}</th>`
            bodyInner += `<td>${multas[i].cpf}</td>`;
            bodyInner += `<td>${multas[i].motivo}</td>`;
            bodyInner += `<td>${dataFormat.toLocaleDateString('pt-BR')}</td>`;
            bodyInner += "</tr>";
        }
        tableMultasBody.innerHTML = bodyInner;
        tableMultas.appendChild(tableMultasHead);
        tableMultas.appendChild(tableMultasBody);
        corpo.appendChild(tableMultas);

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
                <Image src={logo2} alt="logo" width={70} height={70} />
                <div id="textoCabecalho"></div>
            </div>
            <div id="corpo"></div>
        </div>

    </>
}