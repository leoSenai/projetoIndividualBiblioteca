import Menu from "../components/menu";
import PageBar from "../components/pageBar";
import ListaMultasAtivas from "../components/listaMultasAtivas";
import ListaMultasInativas from "../components/listaMultasInativas";
import MultaModal from "../components/multaModal";
import { useState } from "react";

export default function Multa(){

    const [controlModal, setControlModal] = useState(false);
    const closeModal = () => {
        setControlModal(false)
    };

    return(<>
        <Menu/>
        <PageBar title="Multas" click={()=>{setControlModal(true)}}/>
        <div className="col col-md-10 m-auto mt-4 ta-center">
            <ListaMultasAtivas />
        </div>
        <div className="col col-md-10 m-auto mt-4 ta-center">
            <ListaMultasInativas />
        </div>
        <MultaModal show={controlModal} close={closeModal}/>
    </>)
}