import Cookies from "universal-cookie";
import useSWR from 'swr'
import { Table } from "react-bootstrap";
import CachedIcon from '@mui/icons-material/Cached';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import * as toastr from 'toastr'

export default function ListaEmprestimosAtivos(props) {
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
    console.log(data);
    const renewHandle = async (id, idcrianca, idlivro) => {
        let addOps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "access_token": access_token,
                "data": {
                    "idemprestimo": id,
                    "idcrianca": idcrianca,
                    "idlivro": idlivro
                }
            }),
        }

        let renovar = await fetch('api/emprestimos/renew', addOps);
        console.log(renovar)
        if (renovar.status != 200) {
            let msg = await renovar.text()
            console.log(msg)
            toastr.error(msg, "Erro")
        } else {
            toastr.success('Empréstimo renovado com sucesso', 'Sucesso')
        }
    }

    const returnHandle = async (id) => {
        let returnOps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "access_token": access_token,
                "data": {
                    "idemprestimo": id,
                }
            }),
        }
        let close = await fetch('api/emprestimos/close', returnOps);
        if (close.status != 200) {
            let msg = await close.text()
            console.log(msg)
            toastr.error(msg, "Erro")
        } else {
            toastr.success('Empréstimo encerrado com sucesso', 'Sucesso')
        }
    }

    const showData = (data) => {
        let dadosFormatados = []
        data.dados.forEach((element) => {
            if (element.ativo === 'S') {

                let dataDevolucao = new Date(element.data_devolucao);
                dadosFormatados.push(
                    <tr key={element.idemprestimo}>
                        <td>{element.cpf}</td>
                        <td>{element.titulo}</td>
                        <td>{element.renovacao}</td>
                        <td>{dataDevolucao.toLocaleDateString('pt-BR')}</td>
                        <td className="ta-center">
                            <div className="mx-3" title="Renovar Empréstimo" onClick={() => renewHandle(element.idemprestimo, element.idcrianca, element.idlivro)}>
                                <CachedIcon />
                            </div>
                            <div className="mx-3" title="Encerrar Empréstimo" onClick={() => returnHandle(element.idemprestimo)}>
                                <DownloadDoneIcon />
                            </div>
                        </td>
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
                        <th className="text-center" colSpan={5}>Ativos</th>
                    </tr>
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
        </>
    }
    return (<>
        <h1>Erro</h1>
    </>)
}