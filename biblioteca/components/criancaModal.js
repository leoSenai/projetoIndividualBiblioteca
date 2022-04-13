import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from '@mui/material/TextField';
import React, { useState } from "react";
export default function CriancaModal(props){
        const show = props.show;

        const [erroCpf, setErroCpf] = useState(false);
        const [erroEmail, setErroEmail] = useState(false);
        const [erroSenha, setErroSenha] = useState(false);

        const handleCpf = async (event) => {
          props.dadosF[1](event.target.value);
          if(isNaN(new Number(event.target.value + 1)) || (event.target.value.length + 1) != 11){
            setErroCpf(true);
            return false;
          }
          setErroCpf(false);
        }

        const handleEmail = (event) => {
          props.dadosF[2](event.target.value);
          if(!event.target.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)){
            setErroEmail(true);
            return false;
          }
          setErroEmail(false);
        }

        const handleSenha = (event) => {
          props.dadosF[3](event.target.value);
          setErroSenha(false);
        }

        const handleAdd = () => {

          if(isNaN(new Number(props.dados[1])) || props.dados[1].length != 11){
            setErroCpf(true);
            return false;
          }

          if(!props.dados[2].match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)){
            setErroEmail(true);
            return false;
          }

          if(props.dados[3] < 4){
            setErroSenha(true);
            return false;
          }

          props.save();

        }



        const readonly = props.novo?true:false;
        const typeKey = props.novo?"new_":"alter_";

        return (
          <>
            <Modal show={show} onHide={props.close} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <TextField id="cpf" error={erroCpf} key={typeKey+1} fullWidth margin="normal" label="CPF" onKeyPress={handleCpf} defaultValue={props.dados[1]} readOnly={!props.novo}   helperText="Apenas Numeros." variant="outlined" />
                  <TextField id="email" error={erroEmail} key={typeKey+2} fullWidth margin="normal" label="Email" defaultValue={props.dados[2]} onChange={handleEmail} placeholder="Email"  variant="outlined" />
                  <TextField id="senha" error={erroSenha} key={typeKey+3} fullWidth margin="normal" label="Senha" defaultValue={props.dados[3]} onChange={handleSenha} placeholder="Senha" type="password"   helperText="Minimo 4 digitos" variant="outlined" />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>
                  Fechar
                </Button>
                <Button variant="primary" onClick={handleAdd}>
                  Salvar
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
}