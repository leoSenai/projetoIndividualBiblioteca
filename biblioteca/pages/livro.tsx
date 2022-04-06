import { useState } from 'react';
import Footer from '../components/footer';
import Lista from '../components/lista';
import Menu from '../components/menu';
import PageBar from '../components/pageBar';

export default function Livro(){

    //Estados//
    //Manutenção da pagina
    const [type,setType] = useState(false);
    const [text,setText] = useState("");
    const [controlModalAdd,setControlModalAdd] = useState(false);
    const [controlModalChange,setControlModalChange] = useState(false);
    const [openToastr,setOpenToastr] = useState(false);

    //Alteração dos dados
    const [ISBN,setISBN] = useState("");
    const [titulo,setTitulo] = useState("");
    const [numeroExemplares,SetNumeroExemplares] = useState(0);
    const [editora,setEditora] = useState("");
    const [tema,setTema] = useState("");
    const [categoria,setCategoria] = useState(0);

    const changeBook = () => {
        
    }

    return (<> 
        <Menu/>
        <PageBar title="Livros" click={()=>{}}/>
        <Lista 
            api="/livro/all" 
            dcop={()=> {}}
            heads={["ISBN","Titulo","Numero de Exemplares", "Editora", "Tema", "Categoria"]} 
            fieldData={["ISBN","titulo","numeroExemplares", "editora", "tema", "categoria"]}
            keyItem={'idlivro'}
        />
        <Footer/>
     </>)
}