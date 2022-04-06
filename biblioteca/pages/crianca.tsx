import Menu from "../components/menu";
import Footer from "../components/footer";
import Lista from "../components/lista";
import CriancaModal from "../components/criancaModal";
import PageBar from "../components/pageBar";
import Cookies from 'universal-cookie';
import React, { useState } from 'react';
import { Alert, Snackbar, Icon } from "@mui/material";
import AlertToastr from "../components/alertToastr";

export default function Crianca() {


    const [controlModal, setControlModal] = useState(false);
    const [controlModalAdd, setControlModalAdd] = useState(false);
    const [open, setOpen]   = useState(false);
    const [text, setText]   = useState("Alteração salva com sucesso");
    const [type, setType]   = useState(true);

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
                "data":{
                    "email_responsavel":email,
                    "senha":senha
                } 
            }),
        }

        let ok = await fetch('api/crianca/' + id, alterOps);
        if (ok.status != 200) {
            setText("Ocorreu Algum erro, tente novamente");
            setType(false)
        }else{
            setText("Alteração salva com sucesso");
            setType(true);
        }

        setOpen(true);
        closeModal();

    }

    const [id, setId] = useState(0);
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    
    const opcoesCrianca = async (selC: any) => {
        let id = selC.target.parentNode.id;
        let crianca = await (await fetch('api/crianca/' + id, options)).json();
        setId(crianca.dados.idcrianca);
        setCpf(crianca.dados.cpf);
        setEmail(crianca.dados.email_responsavel);
        setSenha("qwerty");
        setControlModal(true);
    }

    const addCrianca = async () => {
        let addOps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "access_token": access_token,
                "data":{
                    "email_responsavel": email,
                    "cpf":cpf,
                    "senha":senha
                }
            }),
        }

        let ok = await fetch('api/crianca/add', addOps);
        if (ok.status != 200) {
            setText("Ocorreu Algum erro, tente novamente");
            setType(false)
        }else{
            setText("Registro salvo com sucesso");
            setType(true);
        }

        setOpen(true);
        closeModal();

    }

    const modalAdd = () => {
        setId(0);
        setCpf("");
        setEmail("");
        setSenha("");
        setControlModalAdd(true);
    }
    return (
        <>
            <Menu />
            <PageBar title="Crianças" click={modalAdd} />
            <div className="col col-md-6 m-auto mt-4 ta-center">
                <Lista 
                    api="/crianca/all" 
                    dcop={opcoesCrianca} 
                    heads={['CPF', 'Email Responsável']} 
                    fieldData={['cpf', 'email_responsavel']} 
                    keyItem={'idcrianca'} />
            </div>
            <CriancaModal show={controlModal} key="1" title="Editando Criança" save={changeData} dados={[id, cpf, email, senha]} dadosF={[setId, setCpf, setEmail, setSenha]} close={closeModal}></CriancaModal>
            <CriancaModal show={controlModalAdd} key="2" title="Adicionando Criança" save={addCrianca} novo dados={[id, cpf, email, senha]} dadosF={[setId, setCpf, setEmail,setSenha]} close={closeModal}></CriancaModal>
            <AlertToastr open={open} type={type} close={handleClose} text={text}/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type?"success":"error"} sx={{ width: '100%' }}>
                    {text}
                </Alert>
            </Snackbar>
            <Footer />
        </>
    )
} 

