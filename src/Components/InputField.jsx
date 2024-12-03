import React from 'react';
import { Button, Col, Container, Modal, Row, Form, InputGroup } from 'react-bootstrap';

function FormPopUp({ editBtnText, onShow, onHide, onSubmit, fields, onChange, title }) {
    return (
        <Modal
            show={onShow}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>
                        <Row>
                            {fields.map((field, index) => (
                                <Col key={index} xs={12} md={6} className="mb-3">
                                    <Form.Label>{field.label}</Form.Label>
                                    <Form.Control
                                        type={field.type || "text"}
                                        placeholder={field.placeholder}
                                        name={field.name}
                                        value={field.value} // Controlled value
                                        onChange={onChange} // Pass handler for dynamic updates
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="dark" onClick={onSubmit}>
                    {editBtnText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FormPopUp;
