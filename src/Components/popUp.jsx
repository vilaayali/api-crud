import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PopUp({ onConform, onHide, show, message, onCancel }) {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}//Handel Clossing 
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {message}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onConform}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopUp;