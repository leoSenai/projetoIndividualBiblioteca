import { Autocomplete, TextField, TextareaAutosize } from "@mui/material";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cookies from "universal-cookie";
import useSWR from 'swr'
import { useState } from "react";
import * as toastr from 'toastr'

export default function EmprestimoModal(props) {
  const show = props.show;

  const [livroInputValue, setLivroInputValue] = useState("");
  const [criancaInputValue, setCriancaInputValue] = useState("");
  const [detalheInputValue, setDetalheInputValue] = useState("");


  const cookies = new Cookies()
  const access_token = cookies.get('access_token');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "access_token": access_token,
      "data": {
        "idlivro": livroInputValue,
        "idcrianca": criancaInputValue,
        "estado_livro": detalheInputValue
      }
    }),
  }

  const makeNew = async () => {
    let addOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "access_token": access_token,
        "data": {
          "idlivro": livroInputValue,
          "idcrianca": criancaInputValue,
          "estado_livro": detalheInputValue
        }
      }),
    }
    let req = await fetch("api/emprestimos/add", addOptions);
    if (req.status != 200) {
      let msg = await req.text()
      console.log(msg)
      toastr.error(msg, "Erro")
    } else {
      toastr.success('Empréstimo executado com sucesso', 'Sucesso')
      props.close();
    }
  }

  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  const livros = useSWR(['/api/livro/all', options], fetcher)
  const criancas = useSWR(['/api/crianca/all', options], fetcher, { refreshInterval: 500 })

  let livrosFormatados = []
  if (livros.data) {
    for (let i = 0; i < livros.data.dados.length; i++) {
      livrosFormatados.push({ label: livros.data.dados[i].titulo, id: livros.data.dados[i].idlivro })
    }
  }

  let criancasFormatadas = []
  if (criancas.data) {
    for (let i = 0; i < criancas.data.dados.length; i++) {
      criancasFormatadas.push({ label: criancas.data.dados[i].cpf, id: criancas.data.dados[i].idcrianca })
    }

  }
  return (
    <>
      <Modal show={show} onHide={props.close} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Emprestar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Autocomplete
            onChange={(event, value) => {
              if (value != null) {
                setCriancaInputValue(value.id);
              } else {
                setCriancaInputValue(value);
              }
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={criancasFormatadas}
            sx={{ width: 470 }}
            className="m-auto"
            renderInput={(params) => <TextField {...params} label="Criança" />}
          />
          <Autocomplete
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, value) => {
              if (value != null) {
                setLivroInputValue(value.id);
              } else {
                setLivroInputValue(value);
              }
            }}
            options={livrosFormatados}
            sx={{ width: 470 }}
            className="m-auto mt-2"
            renderInput={(params) => <TextField {...params} label="Livro" />}
          />
          <TextareaAutosize
            value={detalheInputValue}
            onChange={(event) => setDetalheInputValue(event.target.value)}
            aria-label="empty textarea"
            className="mt-2"
            placeholder="Detalhes"
            maxLength={90}
            style={{ width: 470 }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Fechar
          </Button>
          <Button variant="primary" onClick={makeNew}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}