import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import useSWR from 'swr'
import { Table } from "react-bootstrap";

export default function Lista(props) {

    let heads = [];

    props.heads.forEach(function (el, k) {
        heads.push(<th id={k} >{el}</th>);
    })


    const cookies = new Cookies()
    const access_token = cookies.get('access_token');
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "access_token": access_token
        }),
    }
    const fetcher = (...args) => fetch(...args).then(r => r.json());
    const { data, error } = useSWR(['/api/' + props.api, options], fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    if (data) {
        
        const field = props.fieldData;
        let dadosExibir = []
        data.dados.forEach((el) => {
            let fieldDt = [];
            field.forEach((fdt) => {
                fieldDt.push(<td>{el[fdt]}</td>);
            });
            dadosExibir.push(
                <tr key={el[field[0]]}>
                    {fieldDt}
                </tr>
            );
        });
        console.log(dadosExibir);
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {heads}
                    </tr>
                </thead>
                <tbody>
                        {dadosExibir}
                </tbody>
            </Table>
        )
    }
    return (<>
        <h1>Erro</h1>   
    </>)
}