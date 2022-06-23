import Menu from "../components/menu";
import PageBar from "../components/pageBar";
import ListaMultasAtivas from "../components/listaMultasAtivas";

export default function Multa(){
    return(<>
        <Menu/>
        <PageBar title="Multas" click={()=>{}}/>
        <div className="col col-md-10 m-auto mt-4 ta-center">
            <ListaMultasAtivas />
        </div>
    </>)
}