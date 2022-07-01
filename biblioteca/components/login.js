import Image from 'next/image'
import logo from '../public/arco-iris.png'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import * as toastr from 'toastr'
import Cookies from 'universal-cookie';

export default function Login() {
    const router = useRouter();

    const cookies = new Cookies();
    let spinner = "spinner-border text-light"
    const handleSubmit = async (event) => {
        
        event.preventDefault();
        
        let user = event.target.querySelector('#usuario').value;
        let pass = event.target.querySelector('#senha').value;
        
        const pkt = JSON.stringify({
            "username": user,
            "password": pass
        })

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: pkt,
          }
        
        const response = await fetch('api/login',options);
        const result = await response.json();
        console.log(result)
        if(response.status == 200){
            cookies.set('access_token', result.data);
            router.push('/dash');
        }else{
            toastr.error("Login ou Senha Invalidos","Erro");
        }


    }

    return (
        <div className={styles.body}>
            <div className="m-auto mw-400">
                <form onSubmit={handleSubmit}>
                    <Image src={logo} alt="logo-arco-iris" height="150" width="200" />
                    <h2 className="mt-2">Biblioteca Sala Arco-Íris</h2>
                    <div className="border p-3">
                        <div className="form-floating m-auto mb-3">
                            <input type="text" className="form-control " id="usuario" placeholder="Usuário" required></input>
                            <label htmlFor="usuario">Usuário</label>
                        </div>
                        <div className="form-floating m-auto ">
                            <input type="password" className="form-control" id="senha" placeholder="Senha" required></input>
                            <label htmlFor="senha">Senha</label>
                        </div>
                        <button className="mt-3 btn-primary btn-lg bg-dark rounded {spinner}" id="logar" type="submit">Entrar</button>
                    </div>
                </form>
            </div>
        </div>)
}