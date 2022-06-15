import Menu from "../components/menu";
import PageBar from "../components/pageBar";
import ListaEmprestimosAtivos from "../components/listaEmprestimosAtivos";
import ListaEmprestimosPassados from "../components/listaEmprestimosPassados";
import EmprestimoModal from "../components/emprestimoModal";
import { useState } from "react";

export default function Emprestimo(){
    
    const [controlModal, setControlModal] = useState(false);
    const closeModal = () => {
        setControlModal(false)
    };

    return (<>
        <Menu/>
        <PageBar title="Empréstimos" click={()=>{setControlModal(true)}}/>
        <div className="col col-md-10 m-auto mt-4 ta-center">
            <ListaEmprestimosAtivos />
        </div>
        <div className="col col-md-10 m-auto mt-4 ta-center">
            <ListaEmprestimosPassados />
        </div>
        <EmprestimoModal show={controlModal} close={closeModal}/>
    </>)
}