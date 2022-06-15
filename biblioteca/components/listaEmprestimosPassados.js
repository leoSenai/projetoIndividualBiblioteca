import Cookies from "universal-cookie";
import useSWR from 'swr'
import { Table } from "react-bootstrap";
import CachedIcon from '@mui/icons-material/Cached';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import * as toastr from 'toastr'

export default function ListaEmprestimosPassados(props) {
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
    const { data, error } = useSWR(['/api/emprestimos/all', options], fetcher, { refreshInterval: 500 })
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const showData = (data) => {
        let dadosFormatados = []
        console.log(data)
        data.dados.forEach((element) => {
            if (element.ativo === 'N') {

                let dataDevolucao = new Date(element.data_devolucao);
                dadosFormatados.push(
                    <tr key={element.idemprestimo}>
                        <td>{element.cpf}</td>
                        <td>{element.titulo}</td>
                        <td>{element.renovacao}</td>
                        <td>{dataDevolucao.toLocaleDateString('pt-BR')}</td>
                    </tr>
                )
            }
        });
        if(dadosFormatados.length == 0){
            return(<tr>
                <td colSpan={5} className="text-center">Nenhum Empréstimo Ativo</td>
            </tr>)
        }
        return dadosFormatados;
    }

    if (data) {
        return <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center" colSpan={4}>Fechados</th>
                    </tr>
                    <tr>
                        <th>CPF Criança</th>
                        <th>Livro</th>
                        <th>Nº de Renovações</th>
                        <th>Data Devolução</th>
                    </tr>
                </thead>
                <tbody>
                    {showData(data)}
                </tbody>
            </Table>
        </>
    }
    return (<>
        <h1>Erro</h1>
    </>)
}