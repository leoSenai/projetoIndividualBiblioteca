import Cookies from "universal-cookie";
import useSWR from 'swr'
import { Table } from "react-bootstrap";
import CachedIcon from '@mui/icons-material/Cached';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function ListaEmprestimos(props) {
// @refresh reset

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
    const { data, error } = useSWR(['/api/emprestimos/all', options], fetcher, {refreshInterval: 500})
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const renewHandle = (id) => {
        console.log(id+"Renovar");
    }

    const returnHandle = (id) => {
        console.log(id+"Retornar");
    }

    const showData = (data) => {
        let dadosFormatados = []
        data.dados.forEach((element)=>{
            let dataDevolucao = new Date(element.data_devolucao);
            dadosFormatados.push(
                <tr key={element.idemprestimo}>
                    <td>{element.cpf}</td>
                    <td>{element.titulo}</td>
                    <td>{element.renovacao}</td>
                    <td>{dataDevolucao.toLocaleDateString('pt-BR')}</td>
                    <td className="rig">
                        <div title="Renovar Empréstimo" onClick={ () => renewHandle(element.idemprestimo)}>
                            <CachedIcon/>
                        </div>
                        <div title="Encerrar Empréstimo" onClick={ () => returnHandle(element.idemprestimo)}>
                            <DownloadDoneIcon/>
                        </div>
                    </td>
                </tr>
            )
        });
        return dadosFormatados;
    }

    if (data) {
        console.log(showData(data));  
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>CPF Criança</th>
                        <th>Livro</th>
                        <th>Nº de Renovações</th>
                        <th>Data Devolução</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {showData(data)}
                </tbody>
            </Table>
        )
    }
    return (<>
        <h1>Erro</h1>   
    </>)
}