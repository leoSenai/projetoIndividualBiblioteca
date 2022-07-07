import { Autocomplete, TextField,  Select, MenuItem, FormControl, Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cookies from "universal-cookie";
import useSWR from 'swr'
import { useState } from "react";
import * as toastr from 'toastr'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MultaModal(props) {
  const show = props.show;

  const [criancaInputValue, setCriancaInputValue] = useState("");
  const [motivoInputValue, setMotivoInputValue] = useState("");
  const [valorInputValue, setValorInputValue] = useState("");
  const [tipo, setTipo] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState(new Date);

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
        "idcrianca": criancaInputValue,
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
          "valor": valorInputValue,
          "tipo": tipo,
          "motivo": motivoInputValue,
          "idcrianca": criancaInputValue,
          "dataDevolucao": dataDevolucao
        }
      }),
    }
    let req = await fetch("api/multas/add", addOptions);
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

  const criancas = useSWR(['/api/crianca/all', options], fetcher, { refreshInterval: 500 })

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
            <TextField className="mt-2" style={{"width":470}} label="Motivo" onChange={(event) => {setMotivoInputValue(event.target.value)}} />
            <FormControl className="mtr-2">
              <InputLabel id="simple-select-label">Tipo</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={tipo}
                label="Tipo"
                style={{width:200}}
                onChange={(event) => { setTipo(event.target.value); }}
                >
                <MenuItem value='A'>Atraso</MenuItem>
                <MenuItem value='R'>Rasura</MenuItem>
                <MenuItem value='D'>Destruição</MenuItem>
              </Select>
            </FormControl>
            <TextField className="mt-2"  label="Valor" onChange={(event) => {setValorInputValue(event.target.value)}} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
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