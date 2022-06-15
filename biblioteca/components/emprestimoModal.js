import { Autocomplete, TextField, TextareaAutosize } from "@mui/material";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cookies from "universal-cookie";
import useSWR from 'swr'

export default function EmprestimoModal(props) {
  const show = props.show;

  const cookies = new Cookies()
  const access_token = cookies.get('access_token');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "access_token": access_token
    }),
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
            options={criancasFormatadas}
            sx={{ width: 470 }}
            className="m-auto"
            renderInput={(params) => <TextField {...params} label="Criança" />}
          />
          <Autocomplete
            options={livrosFormatados}
            sx={{ width: 470 }}
            className="m-auto mt-2"
            renderInput={(params) => <TextField {...params} label="Livro" />}
          />
          <TextareaAutosize
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
          <Button variant="primary" onClick={null}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}