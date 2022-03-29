import Menu from "../components/menu";
import Footer from "../components/footer";
import Lista from "../components/lista";

export default function Crianca() {
    return(
        <>
            <Menu/>
            <Lista api="/crianca/all" heads={['Id','CPF', 'Email Responsável', 'Opções']} fieldData={['idcrianca','cpf','email_responsavel']}/>
            <Footer/>
        </>
    )
} 
