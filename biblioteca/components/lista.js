import Cookies from "universal-cookie";
import useSWR from 'swr'
import { Table } from "react-bootstrap";

export default function Lista(props) {
// @refresh reset
    let heads = [];

    props.heads.forEach(function (el, k) {
        heads.push(<th key={'head_'+k} >{el}</th>);
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
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(['/api/' + props.api, options], fetcher, {refreshInterval: 500})


    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    if (data) {
        
        const field = props.fieldData;
        let dadosExibir = []
        data.dados.forEach((el) => {
            let fieldDt = [];
            let i = 0;

            field.forEach((fdt) => {
                fieldDt.push(<td key={el[props.keyItem]+'_'+el[fdt]}>{el[fdt]}</td>);
            });
            while(heads.length > fieldDt.length) {
                fieldDt.push(<td key={'solo_'+i}></td>);
            }
            dadosExibir.push(
                <tr onDoubleClick={props.dcop} title="Clique duas vezes para opções" id={el[props.keyItem]} key={'tr_'+el[props.keyItem]}>
                    {fieldDt}
                </tr>
            );
        });
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