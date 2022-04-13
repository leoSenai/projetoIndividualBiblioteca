import { useState } from 'react';
import Cookies from 'universal-cookie';
import Footer from '../components/footer';
import Lista from '../components/lista';
import Menu from '../components/menu';
import PageBar from '../components/pageBar';
import LivroModal from '../components/livroModal'

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
    const [numeroExemplares,setNumeroExemplares] = useState(0);
    const [editora,setEditora] = useState("");
    const [tema,setTema] = useState("");
    const [categoria,setCategoria] = useState(0);

    const cookies = new Cookies()
    const access_token = cookies.get('access_token');

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
            console.log(ok);
        }else{
            console.log(ok);
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
    
    return (<> 
        <Menu/>
        <PageBar title="Livros" click={()=>{}}/>
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
        <Footer/>
     </>)
}