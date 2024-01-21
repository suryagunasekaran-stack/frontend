import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';

const EmployeeModal = ({ show, handleClose, onEmployeeSubmit, employeeMap  }) => {
    const [employeeData, setEmployeeData] = useState({
        permitNumber: '',
        name: '',
        ppe: {},
        signature: ''
    });
    const sigCanvasRef = useRef(null);
    

    const handlePPEChange = (ppeItem) => {
        setEmployeeData({
            ...employeeData,
            ppe: {
                ...employeeData.ppe,
                [ppeItem]: !employeeData.ppe[ppeItem]
            }
        });
    };

    const handlePermitNumberChange = (e) => {
        const permitNumber = e.target.value;
        const employee = employeeMap.get(permitNumber);
        setEmployeeData({
            ...employeeData,
            permitNumber: permitNumber,
            name: employee ? employee.NAME : ''
        });
    };

    const submitEmployee = () => {
        const signatureData = sigCanvasRef.current
            ? sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png')
            : '';
    
        // Create the updatedEmployeeData object directly using the current state
        console.log(signatureData)
        const updatedEmployeeData = {
            permitNumber: employeeData.permitNumber,
            name: employeeData.name,
            ppe: employeeData.ppe,
            signature: signatureData
        };
    
        onEmployeeSubmit(updatedEmployeeData);  // Submitting the data
        handleClose();  // Closing the modal
    };
    
    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group controlId="PermitNumber">
                    <Form.Label>Employee / Permit Number</Form.Label>
                    <Form.Control
                        type="text"
                        value={employeeData.permitNumber}
                        onChange={handlePermitNumberChange}
                    />
                </Form.Group>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={employeeData.name}
                        readOnly
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>PPE</Form.Label>
                    {['Life Jacket', 'Body Harness', 'Safety Gear', 'Face Shield', 'Hand Gear', 'Others'].map(ppe => (
                        <Form.Check 
                            key={ppe}
                            type="checkbox"
                            label={ppe}
                            onChange={() => handlePPEChange(ppe)}
                            checked={!!employeeData.ppe[ppe]}
                        />
                    ))}
                </Form.Group>
                <Form.Group controlId="Signature">
                    <Form.Label>Signature</Form.Label>
                    <SignatureCanvas
                        ref={sigCanvasRef}
                        penColor='black'
                        canvasProps={{ width: 300, height: 100, className: 'sigCanvas', style: { border: "2px solid black" } }}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={submitEmployee}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EmployeeModal;




