import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from '@mui/material/TextField';

export default function CriancaModal(props){
        const show = props.show;

        const handleEmail = (event) => {
          props.dadosF[2](event.target.value);
        }

        return (
          <>
            <Modal show={show} onHide={props.close} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <TextField id="outlined-basic" fullWidth margin="normal" label="CPF" value={props.dados[1]} readOnly variant="outlined" />
                  <TextField id="outlined-basic" fullWidth margin="normal" label="Email" defaultValue={props.dados[2]} onChange={handleEmail} placeholder="Email"  variant="outlined" />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>
                  Fechar
                </Button>
                <Button variant="primary" onClick={props.save}>
                  Salvar
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
}