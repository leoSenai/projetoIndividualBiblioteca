import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export default function CriancaModal(props){
        const show = props.show;
        console.log(props)
        return (
          <>
            <Modal show={show} onHide={props.close} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <input type="text" value={props.dados.id} onKeyPress={props.dadosF[0](123)}></input>
                  {props.dados}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>
                  Close
                </Button>
                <Button variant="primary" onClick={props.close}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
}