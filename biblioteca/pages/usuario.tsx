import { useState } from 'react';
import Cookies from 'universal-cookie';
import Footer from '../components/footer';
import Lista from '../components/lista';
import Menu from '../components/menu';
import PageBar from '../components/pageBar';
import AlertToastr from '../components/alertToastr';
import UsuarioModal from '../components/usuarioModal';

export default function Usuario(){

    //Estados//
    //Manutenção da pagina
    const [type,setType] = useState(false);
    const [text,setText] = useState("");
    const [controlModalAdd,setControlModalAdd] = useState(false);
    const [controlModalChange,setControlModalChange] = useState(false);
    const [openToastr,setOpenToastr] = useState(false);

    //Alteração dos dados
    const [id, setId] = useState(0);
    const [nome,setNome] = useState("");
    const [matricula,setMatricula] = useState("");
    const [senha,setSenha] = useState("");
    const [administrador,setAdministrador] = useState("");

    const cookies = new Cookies()
    const access_token = cookies.get('access_token');

    const handleClose = () => {setOpenToastr(false)}

    const changeUser = async () => {

        let novaSenha = senha == 'qwerty'? undefined:senha;

        let alterOps = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "access_token": access_token,
                "data":{
                    "nome":nome,
                    "matricula":matricula,
                    "senha":novaSenha,
                    "administrador":administrador,
                }
            }),
        }

        let ok = await fetch('api/usuario/' + id, alterOps);
        if (ok.status != 200) {
            setType(false);
            setText("Ocorreu algum problema");
            setOpenToastr(true);
            setControlModalChange(false);
        }else{
            setType(true);
            setText("Alterado com sucesso");
            setOpenToastr(true);
            setControlModalChange(false);
        };
    }
    const modalChangeUser = async (selC: any) => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "access_token": access_token
            }),
        }
    

        let id = selC.target.parentNode.id;
        let usuario =  await (await fetch('/api/usuario/'+ id, options)).json()
        console.log(usuario);
        setId(id);
        setNome(usuario.nome);
        setMatricula(usuario.matricula);
        setSenha("qwerty");
        setAdministrador(usuario.administrador);
        setControlModalChange(true);
    }
    
    const addUser = async () => {

        let addOps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "access_token": access_token,
                "data":{
                    "nome":nome,
                    "matricula":matricula,
                    "senha":senha,
                    "administrador":administrador,
                }
            }),
        }
        let usuario =  await fetch('/api/usuario/add', addOps);
        if (usuario.status != 200) {
            setType(false);
            setText("Ocorreu algum problema");
            setOpenToastr(true);
            setControlModalAdd(false);
        }else{
            setType(true);
            setText("Adicionado com sucesso");
            setOpenToastr(true);
            setControlModalAdd(false);
        };
    } 

    const modalAddBook = () => {
        setId(0);
        setNome("");
        setAdministrador("N");
        setMatricula("");
        setSenha("");
        setControlModalAdd(true);
    }

    return (<> 
        <Menu/>
        <PageBar title="Livros" click={modalAddBook}/>
        <Lista 
            api="/usuario/all" 
            dcop={modalChangeUser}
            heads={["Nome","Matricula","Administrador"]} 
            fieldData={["nome","matricula","administrador"]}
            keyItem={'idusuario'}
        />
        <UsuarioModal 
            key={1} 
            title={"Alterando Usuário"}
            dados={{nome,matricula, senha, administrador}}
            dadosF={{setNome, setMatricula, setSenha, setAdministrador}}
            show={controlModalChange} 
            save={changeUser}
            close={()=> {setControlModalChange(false)}}
        />
        <UsuarioModal 
            key={2} 
            title={"Adicionando Usuário"}
            dados={{nome,matricula, senha, administrador}}
            dadosF={{setNome, setMatricula, setSenha, setAdministrador}}
            show={controlModalAdd} 
            save={addUser}
            close={()=> {setControlModalAdd(false)}}
        />
        <AlertToastr open={openToastr} type={type} close={handleClose} text={text}/>
        <Footer/>
     </>)
}