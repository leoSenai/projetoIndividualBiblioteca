import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from '@mui/material/TextField';
import React, { useState, useReducer } from "react";

export default function LivroModal(props) {
  const show = props.show;

  const inicialState = {
    erroISBN: false,
    erroTitle: false,
    erroNumExemp: false,
    erroEdit: false,
    erroTheme: false,
    erroCat: false
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'isbn':
        return {
          erroISBN: action.value,
          erroTitle: state.erroTitle,
          erroNumExemp: state.erroNumExemp,
          erroEdit: state.Edit,
          erroTheme: state.Theme,
          erroCat: state.erroCat
        };
      case 'title':
        return {
          erroTitle: action.value,
          erroISBN: state.erroISBN,
          erroNumExemp: state.erroNumExemp,
          erroEdit: state.Edit,
          erroTheme: state.Theme,
          erroCat: state.erroCat
        };
      case 'numExemp':
        return {
          erroNumExemp: action.value,
          erroISBN: state.erroISBN,
          erroTitle: state.erroTitle,
          erroEdit: state.Edit,
          erroTheme: state.Theme,
          erroCat: state.erroCat
        };
      case 'edit':
        return {
          erroEdit: action.value,
          erroISBN: state.erroISBN,
          erroTitle: state.erroTitle,
          erroNumExemp: state.erroNumExemp,
          erroTheme: state.Theme,
          erroCat: state.erroCat
        };
      case 'theme':
        return {
          erroTheme: action.value,
          erroISBN: state.erroISBN,
          erroTitle: state.erroTitle,
          erroNumExemp: state.erroNumExemp,
          erroEdit: state.Edit,
          erroCat: state.erroCat
        };
      case 'cat':
        return {
          erroCat: action.value,
          erroISBN: state.erroISBN,
          erroTitle: state.erroTitle,
          erroNumExemp: state.erroNumExemp,
          erroEdit: state.Edit,
          erroTheme: state.Theme,
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
          <TextField id="ISBN" error={state.erroISBN} key={typeKey + 1} fullWidth margin="normal" label="ISBN" onKeyPress={() => handleInput(props.dadosF.setISBN, 'isbn')} defaultValue={props.dados.ISBN} variant="outlined" />
          <TextField id="title" error={state.erroTitle} key={typeKey + 2} fullWidth margin="normal" label="Titulo" onKeyPress={() => handleInput(props.dadosF.setTitulo, 'title')} defaultValue={props.dados.titulo} variant="outlined" />
          <TextField id="numExemp" error={state.erroNumExemp} key={typeKey + 3} fullWidth margin="normal" label="Numero de Exemplares" onKeyPress={() => handleInput(props.dadosF.setNumeroExemplares, 'numExemp')} defaultValue={props.dados.numeroExemplares } variant="outlined" />
          <TextField id="edit" error={state.erroEdit} key={typeKey + 4} fullWidth margin="normal" label="Editora" onKeyPress={() => handleInput(props.dadosF.setEditora, 'edit')} defaultValue={props.dados.editora} variant="outlined" />
          <TextField id="theme" error={state.erroTheme} key={typeKey + 5} fullWidth margin="normal" label="Tema" onKeyPress={() => handleInput(props.dadosF.setTema, 'theme')} defaultValue={props.dados.tema} variant="outlined" />
          <TextField id="cat" error={state.erroCat} key={typeKey + 6} fullWidth margin="normal" label="Categoria" onKeyPress={() => handleInput(props.dadosF.setCategoria, 'cat')} defaultValue={props.dados.categoria} variant="outlined" />
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