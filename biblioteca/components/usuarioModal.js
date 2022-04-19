import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import React, { useState, useReducer } from "react";

export default function UsuarioModal(props) {
  const show = props.show;

  const inicialState = {
    erroNome: false,
    erroMatricula: false,
    erroSenha: false,
    erroAdministrador: false,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'nome':
        return {
          erroNome: action.value,
          erroMatricula: state.erroMatricula,
          erroSenha: state.erroSenha,
        };
      case 'matricula':
        return {
          erroMatricula: action.value,
          erroNome: state.erroNome,
          erroSenha: state.erroSenha,
        };
      case 'senha':
        return {
          erroSenha: action.value,
          erroNome: state.erroNome,
          erroMatricula: state.erroMatricula,
        };
      default:
        console.log(action.type);
    }
  }

  const [state, dispatch] = useReducer(reducer, inicialState);

  const handleInput = (fn, type) => {
    fn(event.target.value);
    if(event.target.value == ""){
      dispatch({type:type, value:true})
    }else{
      dispatch({type:type, value:false})
    }
  } 

  const handleADM = () => {
    let value = props.dados.administrador == 'S'? 'N':'S'
    props.dadosF.setAdministrador(value);
  }

  const handleAdd = () => {
    props.save();
  }

  const typeKey = props.novo ? "new_" : "alter_";
  return (
    <>
      <Modal show={show} onHide={props.close} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField id="Nome" error={state.erroNome} key={typeKey + 1} fullWidth margin="normal" label="Nome" onChange={() => handleInput(props.dadosF.setNome, 'nome')} defaultValue={props.dados.nome} variant="outlined" />
          <TextField id="matricula" error={state.erroMatricula} key={typeKey + 2} fullWidth margin="normal" label="Matricula" onChange={() => handleInput(props.dadosF.setMatricula, 'matricula')} defaultValue={props.dados.matricula} variant="outlined" />
          <TextField id="senha" error={state.erroSenha} key={typeKey + 3} fullWidth margin="normal" label="Senha" onChange={() => handleInput(props.dadosF.setSenha, 'senha')} defaultValue={props.dados.senha } variant="outlined" type="password" />
          <Switch checked={props.dados.administrador=='S'? true:false} onChange={handleADM} inputProps={{ 'aria-label': 'controlled' }}/>
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