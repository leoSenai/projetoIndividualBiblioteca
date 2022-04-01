import Menu from "../components/menu";
import Footer from "../components/footer";
import Lista from "../components/lista";
import CriancaModal from "../components/criancaModal";
import Cookies from 'universal-cookie';
import React, { useState } from 'react';
import { Alert, Snackbar, Icon } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function Crianca() {


    const [controlModal, setControlModal] = useState(false);
    const [controlModalAdd, setControlModalAdd] = useState(false);
    const [open, setOpen]   = useState(false);
    const [text, setText]   = useState("Alteração salva com sucesso");
    const [type, setType]   = useState("success");

    const closeModal = () => {
        setControlModal(false)
        setControlModalAdd(false)
    };
    const handleClose = () => setOpen(false);


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

    const changeData = async () => {

        let alterOps = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "access_token": access_token,
                "email_responsavel": email
            }),
        }

        let ok = await fetch('api/crianca/' + id, alterOps);
        if (ok.status != 200) {
            setText("Ocorreu Algum erro, tente novamente");
            setType("error")
        }else{
            setText("Alteração salva com sucesso");
            setType("success");
        }

        setOpen(true);
        closeModal();

    }

    const [id, setId] = useState(0);
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    
    const opcoesCrianca = async (selC: any) => {
        let id = selC.target.parentNode.id;
        let crianca = await (await fetch('api/crianca/' + id, options)).json();
        setId(crianca.dados.idcrianca);
        setCpf(crianca.dados.cpf);
        setEmail(crianca.dados.email_responsavel);
        setControlModal(true);
    }

    const addCrianca = () => {
        
    }

    const modalAdd = () => {
        setControlModalAdd(true);
    }
    return (
        <>
            <Menu />
            <div className="col col-md-12 m-auto mt-4 ta-center text-white bg-dark">
                <h2 className="m-auto">Crianças</h2>
                <button className="btn btn-dark mx-2" onClick={modalAdd}>Adicionar<AddIcon fontSize="small" style={{verticalAlign: "text-top"}}/></button>
            </div>
            <div className="col col-md-6 m-auto mt-4 ta-center">
                <Lista api="/crianca/all" dcop={opcoesCrianca} heads={['CPF', 'Email Responsável']} fieldData={['cpf', 'email_responsavel']} keyItem={'idcrianca'} />
            </div>
            <CriancaModal show={controlModal} title="Editando Criança" save={changeData} dados={[id, cpf, email]} dadosF={[setId, setCpf, setEmail]} close={closeModal}></CriancaModal>
            <CriancaModal show={controlModalAdd} title="Adicionando Criança" save={addCrianca} dados={[id, cpf, email]} dadosF={[setId, setCpf, setEmail]} close={closeModal}></CriancaModal>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {text}
                </Alert>
            </Snackbar>
            <Footer />
        </>
    )
} 

