import { Autocomplete, TextField } from "@mui/material";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function EmprestimoModal(props) {
    const show = props.show;
    
    return (
        <>
          <Modal show={show} onHide={props.close} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Emprestar Livro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Autocomplete
                    options={["ola","chute"]}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Criança" />}
                />
                <Autocomplete
                    options={["ola","chute"]}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Livro" />}
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