import React, { useRef, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';

export const RejectionModal = ({ showRejectModal, handleCloseRejectModal, onSaveReject, dateTime }) => {
    const sigCanvas = useRef({});
    const [rejectionComments, setRejectionComments] = useState("");
    const username = localStorage.getItem("username"); // Get username from localStorage

    const clearSignature = () => {
        sigCanvas.current.clear();
    };

    const saveAndClose = () => {
        const signatureData = sigCanvas.current.toDataURL();
        onSaveReject(rejectionComments, dateTime, signatureData, username); // Pass username along with other data
        handleCloseRejectModal();
    };

    return (
        <Modal show={showRejectModal} onHide={handleCloseRejectModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Reject Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="rejectionComments">
                        <Form.Label>Rejection Comments</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Provide a reason for rejection..."
                            value={rejectionComments}
                            onChange={(e) => setRejectionComments(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="rejectionDateTime" className="mt-3">
                        <Form.Label>Rejection Date and Time</Form.Label>
                        <Form.Control
                            type="text"
                            readOnly
                            value={dateTime}
                        />
                    </Form.Group>
                    <Form.Group controlId="rejectionSignature" className="mt-3">
                        <Form.Label>Rejection Signature</Form.Label>
                        <SignatureCanvas penColor='black'
                                         canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
                                         ref={sigCanvas} />
                        <Button variant="secondary" size="sm" onClick={clearSignature} className="mt-2">
                            Clear Signature
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseRejectModal}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={saveAndClose}>
                    Confirm Rejection
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
