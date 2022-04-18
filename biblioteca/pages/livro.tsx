import { useState } from 'react';
import Cookies from 'universal-cookie';
import Footer from '../components/footer';
import Lista from '../components/lista';
import Menu from '../components/menu';
import PageBar from '../components/pageBar';
import LivroModal from '../components/livroModal'
import AlertToastr from '../components/alertToastr';
import { LocalActivityRounded } from '@mui/icons-material';

export default function Livro(){

    //Estados//
    //Manutenção da pagina
    const [type,setType] = useState(false);
    const [text,setText] = useState("");
    const [controlModalAdd,setControlModalAdd] = useState(false);
    const [controlModalChange,setControlModalChange] = useState(false);
    const [openToastr,setOpenToastr] = useState(false);

    //Alteração dos dados
    const [id, setId] = useState(0);
    const [ISBN,setISBN] = useState("");
    const [titulo,setTitulo] = useState("");
    const [numeroExemplares,setNumeroExemplares] = useState("");
    const [editora,setEditora] = useState("");
    const [tema,setTema] = useState("");
    const [categoria,setCategoria] = useState("");

    const cookies = new Cookies()
    const access_token = cookies.get('access_token');

    const handleClose = () => {setOpenToastr(false)}

    const changeBook = async () => {
        let alterOps = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "access_token": access_token,
                "data":{
                    "ISBN":ISBN,
                    "titulo":titulo,
                    "numeroExemplares":numeroExemplares,
                    "editora":editora,
                    "tema":tema,
                    "categoria":categoria
                }
            }),
        }

        let ok = await fetch('api/livro/' + id, alterOps);
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
    const modalChangeBook = async (selC: any) => {
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
        let livro =  await (await fetch('/api/livro/'+ id, options)).json()
        setId(id);
        setISBN(livro.ISBN);
        setTitulo(livro.titulo);
        setNumeroExemplares(livro.numeroExemplares);
        setEditora(livro.editora);
        setTema(livro.tema);
        setCategoria(livro.categoria);
        setControlModalChange(true);
    }
    
    const addBook = async () => {



        let addOps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "access_token": access_token,
                "data":{
                    "ISBN":ISBN,
                    "titulo":titulo,
                    "numeroExemplares":numeroExemplares,
                    "editora":editora,
                    "tema":tema,
                    "categoria":categoria
                }
            }),
        }
        let livro =  await fetch('/api/livro/add', addOps);
        if (livro.status != 200) {
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
        setISBN("");
        setTitulo("");
        setNumeroExemplares("");
        setEditora("");
        setTema("");
        setCategoria("");
        setControlModalAdd(true);
    }

    return (<> 
        <Menu/>
        <PageBar title="Livros" click={modalAddBook}/>
        <Lista 
            api="/livro/all" 
            dcop={modalChangeBook}
            heads={["ISBN","Titulo","Numero de Exemplares", "Editora", "Tema", "Categoria"]} 
            fieldData={["ISBN","titulo","numeroExemplares", "editora", "tema", "categoria"]}
            keyItem={'idlivro'}
        />
        <LivroModal 
            key={1} 
            title={"Alterando Livro"}
            dados={{ISBN,titulo, numeroExemplares, editora, tema, categoria}}
            dadosF={{setISBN, setTitulo, setNumeroExemplares, setEditora, setTema, setCategoria}}
            show={controlModalChange} 
            save={changeBook}
            close={()=> {setControlModalChange(false)}}
        />
        <LivroModal 
            key={2} 
            title={"Adicionando Livro"}
            dados={{ISBN,titulo, numeroExemplares, editora, tema, categoria}}
            dadosF={{setISBN, setTitulo, setNumeroExemplares, setEditora, setTema, setCategoria}}
            show={controlModalAdd} 
            save={addBook}
            close={()=> {setControlModalAdd(false)}}
        />
        <AlertToastr open={openToastr} type={type} close={handleClose} text={text}/>
        <Footer/>
     </>)
}