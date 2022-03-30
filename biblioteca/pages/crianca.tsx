import Menu from "../components/menu";
import Footer from "../components/footer";
import Lista from "../components/lista";
import CriancaModal from "../components/criancaModal";
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
export default function Crianca() {

    const [controlModal, setControlModal] = useState(false);
    
    const closeModal = () => setControlModal(false);

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

    const [id, setId] = useState(0);
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");

    const opcoesCrianca = async (selC:any) => {

        let id = selC.target.parentNode.id;
        let crianca = await (await fetch('api/crianca/'+id, options)).json();
        console.log(crianca);
        setId(crianca.dados.idcrianca);
        setCpf(crianca.dados.cpf);
        setEmail(crianca.dados.email_responsavel);
        setControlModal(true);
    }

    return(
        <>
            <Menu/>
                <div className="col col-md-8 m-auto mt-4 ta-center">
                    <Lista api="/crianca/all" dcop={opcoesCrianca} heads={['CPF', 'Email Responsável']} fieldData={['cpf','email_responsavel']} keyItem={'idcrianca'}/>
                </div>
                <CriancaModal show={controlModal} dados={[id, cpf, email]} dadosF={[setId, setCpf]} close={closeModal}></CriancaModal> 
            <Footer/>
        </>
    )
} 
