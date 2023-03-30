import { Modal, Button } from "react-bootstrap"

export function RemoveEventModal({name, id, callback, show, showCallback}) {
    const handleClick = (id) => {
        callback(id)
        showCallback()
    }
    
    return(
        <Modal show={show} onHide={showCallback}>
                <Modal.Header closeButton>
                    <Modal.Title>Smazání akce</Modal.Title>
                </Modal.Header>
                <Modal.Body>Opravdu chceš akci s názvem <b>{name}</b> smazat?</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={showCallback}>
                    Zrušit
                </Button>
                <Button variant="danger" onClick={() => handleClick(id)}>
                    Smazat
                </Button>
                </Modal.Footer>
      </Modal>
    )
}