import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';
import '../../css/EmployeeModa.css'

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
        setEmployeeData(prevData => ({
            ...prevData,
            permitNumber: permitNumber,
            name: employee ? employee.NAME : prevData.name
        }));
    };
    
    const submitEmployee = () => {
        const signatureData = sigCanvasRef.current
            ? sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png')
            : '';
    
        const blankSignatureData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAAD5Ip3+AAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII=';
    
        // Check if the signature is empty (matches the blank canvas data URL)
        if (signatureData === blankSignatureData) {
            alert("Signature cannot be empty.");
            return;
        }
    
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
                <Modal.Title>Add Employee:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group controlId="PermitNumber">
                    <Form.Label>Employee / Permit Number:</Form.Label>
                    <Form.Control
                        type="text"
                        value={employeeData.permitNumber}
                        onChange={handlePermitNumberChange}
                    />
                </Form.Group>
                <Form.Group controlId="Name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        value={employeeData.name}
                        onChange={(e) => setEmployeeData({...employeeData, name: e.target.value})}
                    />
                </Form.Group>

                <Form.Group>
                <Form.Label>PPE:</Form.Label>
                    <div className="d-flex flex-wrap">
                        {['HG - Hand Gloves', 'SG - Safety goggles', 'FS - Face shield', 'BH - Body Harness', 'LJ - Life Jacket', 'Others'].map(ppe => (
                            <div
                                key={ppe}
                                className={`ppe-box ${employeeData.ppe[ppe] ? 'checked' : ''}`}
                                onClick={() => handlePPEChange(ppe)}
                            >
                                {ppe}
                            </div>
                        ))}
                    </div>
                </Form.Group>

                <Form.Group controlId="Signature">
                <Form.Label>Signature:</Form.Label>
                <div className="signature-canvas-container">
                    <SignatureCanvas
                        ref={sigCanvasRef}
                        penColor='black'
                        canvasProps={{ 
                            width: 500, 
                            height: 200, 
                            className: 'sigCanvas', 
                            style: { border: "none", width: "100%", height: "100%" } 
                        }}
                    />
                    <div className="clear-signature-button" onClick={() => sigCanvasRef.current.clear()}>
                        Clear
                    </div>
                </div>
            </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={submitEmployee}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EmployeeModal;




