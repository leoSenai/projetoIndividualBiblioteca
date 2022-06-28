import Cookies from "universal-cookie";
import useSWR from 'swr'
import { Table } from "react-bootstrap";
import InfoIcon from '@mui/icons-material/Info';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { jsPDF } from 'jspdf'
import * as toastr from 'toastr'

export default function ListaMultasInativas () {
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
    const { data, error } = useSWR(['/api/multas/inativas', options], fetcher, { refreshInterval: 500 })
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    let formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

    const infoHandle = (idmulta) => {
    }
    
    const receiptHandle = async (idmulta) => {
        let multa = (data.dados.filter(el => el.idmulta === idmulta))[0];
        let corpoMulta = `A biblioteca da ONG Sala Arco-Iris declara que o usuário, portador do CPF: ${multa.cpf}, quitou sua multa referente ao numero de identificação ${multa.idmulta}. Multa esta gerada pelo motivo de ${multa.tipo} na data ${multa.data_inicio}, com termino no dia ${multa.data_quitacao}.`
        const rec = new jsPDF();
        rec.text(rec.splitTextToSize(corpoMulta, 200), 10, 10);
        
        rec.save("recibo.pdf");
            // let addOps = {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         "access_token": access_token,
            //     }),
            // }
    
            // let renovar = await fetch(`api/multas/pdf/${idmulta}`, addOps);
            // console.log(renovar);
    }

    const showData = (data) => {
        let dadosFormatados = []
        data.dados.forEach((element) => {

                let dataQuitacao = new Date(element.data_quitacao);
                let dataAplicacao = new Date(element.data_inicio);
                let tipo = "";
                if(element.tipo == "A"){
                    tipo = "Atraso";
                }
                if(element.tipo == "D"){
                    tipo = "Destruição"
                }
                if(element.tipo == "R"){
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
                            <div className="mx-3" title="Informações" onClick={() => infoHandle(element.idmulta)}>
                                <InfoIcon/>
                            </div>
                            <div className="mx-3" title="Visualizar Recibo" onClick={() => receiptHandle(element.idmulta)}>
                                <ReceiptIcon/>
                            </div>
                        </td>
                    </tr>
                )
        });
        if(dadosFormatados.length == 0){
            return(<tr>
                <td colSpan={5} className="text-center">Nenhuma Multa Ativa</td>
            </tr>)
        }
        return dadosFormatados;
    }

    if (data) {
        return <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center" colSpan={6}>Inativas</th>
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