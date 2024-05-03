import React, { useState, useRef } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const AmendmentsModal = ({ showAmendmentsModal, handleCloseAmendments, onSaveAmendments, record }) => {
    const [department, setDepartment] = useState(record.department);
    const [location, setLocation] = useState(record.location);
    const [type, setType] = useState(record.type);
    const [dateTime, setDateTime] = useState(record.dateTime);
    const [vessel, setVessel] = useState(record.vessel);
    const [topic, setTopic] = useState(record.topic);
    const [raNumber, setRaNumber] = useState(record.raNumber);
    const [commentedBy, setcommentedBy] = useState('');
    const username = localStorage.getItem('username');
    const [amendedBy, setAmendedBy] = useState(username);
    const sigCanvas = useRef({});

    const clearSignature = () => {
        sigCanvas.current.clear();
    };

    const handleSaveAmendments = () => {
        const signatureData = sigCanvas.current.toDataURL(); // Capture signature as base64 string
        const amendmentsData = {
            department, // Assuming these variables hold the current values of the fields
            location,
            type,
            dateTime,
            vessel,
            topic,
            raNumber,
        };
    
        onSaveAmendments(amendmentsData, amendedBy, commentedBy, signatureData);
        handleCloseAmendments(); // Close the modal after saving
    };
    


    return (
        <Modal show={showAmendmentsModal} onHide={handleCloseAmendments} centered>
            <Modal.Header closeButton>
                <Modal.Title>Amend Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="department">
                        <Form.Label>Department</Form.Label>
                        <Form.Control
                            type="text"
                            value={department}
                            onChange={e => setDepartment(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            type="text"
                            value={type}
                            onChange={e => setType(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="dateTime">
                        <Form.Label>Date and Time</Form.Label>
                        <div>
                            <ReactDatePicker
                                selected={new Date(dateTime)} // Convert your state to a Date object if it's not already
                                onChange={(date) => setDateTime(date)}
                                showTimeSelect
                                dateFormat="Pp" // Adjust date format as needed
                                className="form-control"
                            />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="vessel">
                        <Form.Label>Vessel</Form.Label>
                        <Form.Control
                            type="text"
                            value={vessel}
                            onChange={e => setVessel(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="topic">
                        <Form.Label>Topic</Form.Label>
                        <Form.Control
                            type="text"
                            value={topic}
                            onChange={e => setTopic(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="raNumber">
                        <Form.Label>RA Number</Form.Label>
                        <Form.Control
                            type="text"
                            value={raNumber}
                            onChange={e => setRaNumber(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Form.Group controlId="amendedBy">
                        <Form.Label>Amended By</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                        />
                            <input
                                type="hidden"
                                value={username}
                                name="amendedBy"
                            />
                    </Form.Group>
                    <Form.Group controlId="commentedBy">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control
                            type="text"
                            value={commentedBy}
                            onChange={e => setcommentedBy(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="rejectionSignature" className="mt-3">
                        <Form.Label>Signature</Form.Label>
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
                <Button variant="secondary" onClick={handleCloseAmendments}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSaveAmendments}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
