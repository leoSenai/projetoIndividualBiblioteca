import Menu from "../components/menu";
import PageBar from "../components/pageBar";
import ListaEmprestimos from "../components/listaEmprestimos";

export default function Emprestimo(){
    return (<>
        <Menu/>
        <PageBar title="Empréstimos" click={()=>{}}/>
        <ListaEmprestimos />
    </>)
}