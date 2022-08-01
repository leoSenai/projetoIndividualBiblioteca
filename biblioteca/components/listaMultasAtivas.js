import Cookies from "universal-cookie";
import useSWR from 'swr'
import { Table } from "react-bootstrap";
import CachedIcon from '@mui/icons-material/Cached';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import * as toastr from 'toastr'

export default function ListaMultasAtivas() {
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
    const { data, error } = useSWR(['/api/multas/ativas', options], fetcher, { refreshInterval: 500 })
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    let formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const handlePayOff = async (idmulta) => {
        let addOps = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "access_token": access_token,
            }),
        }

        let quitar = await fetch(`api/multas/${idmulta}`, addOps);
        if(quitar.status != 200) {
            let msg = await quitar.text()
            console.log(msg)
            toastr.error(msg, "Erro")
        } else {
            toastr.success('Multa quitada com sucesso', 'Sucesso')
        }
    }

    const showData = (data) => {
        let dadosFormatados = []
        data.dados.forEach((element) => {

            let dataQuitacao = new Date(element.data_quitacao);
            let dataAplicacao = new Date(element.data_inicio);
            let tipo = "";
            if (element.tipo == "A") {
                tipo = "Atraso";
            }
            if (element.tipo == "D") {
                tipo = "Destruição"
            }
            if (element.tipo == "R") {
                tipo = "Rasura";
            }
            dadosFormatados.push(
                <tr key={element.idmulta}>
                    <td>{element.cpf}</td>
                    <td>{dataAplicacao.toLocaleDateString('pt-BR')}</td>
                    <td>{tipo}</td>
                    <td>{formatter.format(element.valor)}</td>
                    <td>{dataQuitacao.toLocaleDateString('pt-BR')}</td>
                    <td className="ta-center">
                        <div className="mx-3" title="Encerrar Empréstimo" onClick={() => handlePayOff(element.idmulta)}>
                            <DownloadDoneIcon />
                        </div>
                    </td>
                </tr>
            )
        });
        if (dadosFormatados.length == 0) {
            return (<tr>
                <td colSpan={6} className="text-center">Nenhuma Multa Ativa</td>
            </tr>)
        }
        return dadosFormatados;
    }

    if (data) {
        return <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center" colSpan={6}>Ativas</th>
                    </tr>
                    <tr>
                        <th>CPF Criança</th>
                        <th>Data Aplicação</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Data Quitação</th>
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