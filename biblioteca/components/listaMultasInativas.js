import Cookies from "universal-cookie";
import useSWR from 'swr'
import { Table } from "react-bootstrap";
import InfoIcon from '@mui/icons-material/Info';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { jsPDF } from 'jspdf'

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

    
    const receiptHandle = async (idmulta) => {
        let multa = (data.dados.filter(el => el.idmulta === idmulta))[0];
        //let imagemCabecalho = fs.readFileSync('../public/logo.jpg')
        let cpf = multa.cpf.substring(0,3)+'.'+ multa.cpf.substring(3,6)+'.'+ multa.cpf.substring(6,9)+'-'+ multa.cpf.substring(9,11);
        let tipo = "";
        if(multa.tipo == 'A'){
            tipo = "Atraso";
        }else if(multa.tipo == 'R'){
            tipo = "Razura";
        }else{
            tipo = "Destruição";
        }
        let data_inicio = (new Date(multa.data_inicio)).toLocaleDateString('pt-BR')
        let data_quitacao = (new Date(multa.data_quitacao)).toLocaleDateString('pt-BR')
        console.log(cpf)
        let corpoMulta = `A biblioteca da ONG Sala Arco-Iris declara que o usuário, portador do CPF: ${cpf}, quitou sua multa referente ao numero de identificação ${multa.idmulta}. Multa esta gerada pelo motivo de ${tipo} na data ${data_inicio}, com termino no dia ${data_quitacao}.`
        const rec = new jsPDF({
            unit:'cm',
            format:'a5',
            orientation:'l'
        });
        let aa = new Image();
        aa.src = './logo.jpg';
        console.log(aa);
        rec.setFont('arial')
        rec.setFontSize(14)
        rec.addImage(aa,'JPEG', 8.5,0.1, 4, 3);
        rec.text(rec.splitTextToSize(corpoMulta, 19), 1, 4);
        rec.text(rec.splitTextToSize("Assinatura Bibliotecario(a):___________________________________________",19),1,8)
        rec.save("recibo.pdf");
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