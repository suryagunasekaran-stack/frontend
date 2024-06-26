import React, {useRef, useEffect, useMemo, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { FaArrowLeft } from 'react-icons/fa';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';
import useFetchData from '../CustomHooks/useFetchData';
import submitFormData from '../Submission/Submitformdata';
import EmployeeModal from './EmployeeModal';

const ToolboxForm = () => {
    const { register, control, handleSubmit, formState: { errors },setValue, watch } = useForm();
    const authorSigRef = useRef(null);
    const supervisorSigRef = useRef(null);
    const navigate = useNavigate();
    const { data: raData } = useFetchData('getRaNumbers');
    const { data: employeeData } = useFetchData('getallname');
    const { data: ipcData } = useFetchData('getipc');
    const raOptions = useMemo(() => raData.map(item => ({
        value: item['RA Ref'],
        label: `${item['RA Ref']} - ${item['INVENTORY OF WORK ACTIVITIES - CRITCAL']}`,
        topic: item['INVENTORY OF WORK ACTIVITIES - CRITCAL']
    })), [raData]);

    const selectedRa = watch('raNumber');
    const [showModal, setShowModal] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [raUrl, setRaUrl] = useState(null);
    const [raExists, setRaExists] = useState(false);


    const isDuplicateEmployee = (newEmployee) => {
        return employees.some(employee => 
            employee.permitNumber === newEmployee.permitNumber || 
            employee.name === newEmployee.name
        );
    };

    const addEmployee = (newEmployeeData) => {
        if (isDuplicateEmployee(newEmployeeData)) {
            alert("Duplicate permit number or name found.");
            return;
        }
        setEmployees(currentEmployees => [...currentEmployees, newEmployeeData]);
    };

    useEffect(() => {
        const ra = raData.find(ra => ra['RA Ref'] === selectedRa);
        if (ra) {
        setValue('topic', ra['INVENTORY OF WORK ACTIVITIES - CRITCAL']);
        checkRaExists(ra['RA Ref']);
        }
    }, [selectedRa, raData, setValue]);

    const checkRaExists = async (raNumber) => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const token = localStorage.getItem("token");
            
            console.log(raNumber)
            // Prepare form data
            const formData = new FormData();
            formData.append("raNumber", raNumber);
    
            const response = await fetch(`${apiUrl}/generate-url`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setRaExists(data.exists);
            setRaUrl(data.url);
        } catch (error) {
            console.error("Error checking RA file:", error);
            setRaExists(false);
            setRaUrl(null);
        }
    };
    
    
    
    
    

    const openRa = () => {
        if (raUrl) {
            window.open(raUrl, '_blank');
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    const ipcOptions = useMemo(() => {
        return Object.entries(ipcData).map(([ipcNumber, vesselName]) => ({
            value: ipcNumber,
            label: `${ipcNumber} - ${vesselName}`
        }));
    }, [ipcData]);
    

    const employeeMap = useMemo(() => {
        const map = new Map();
        employeeData.forEach(emp => map.set(emp['EMP NO.'], emp));
        return map;
    }, [employeeData]);

    
    const selectedIpc = watch('ipcNumber');
    useEffect(() => {
        // Check if ipcData object has the selectedIpc as a key
        if (ipcData && (selectedIpc in ipcData)) {
            setValue('ipcNumber', selectedIpc);
            setValue('vessel', ipcData[selectedIpc]);
        }
    }, [selectedIpc, ipcData, setValue]);
    
    const onSubmit = async (data) => {
        // Confirmation step
        const isConfirmed = window.confirm("Are you sure you want to submit this form?");
        if (!isConfirmed) {
            return; // Exit the function if the user does not confirm
        }
    
        setIsSubmitting(true);
        const combinedData = {
            ...data,
            items: employees,
        };
    
        try {
            await submitFormData(combinedData, authorSigRef, supervisorSigRef);
            window.alert('Success: Operation completed successfully.');
            navigate(-1); // Navigate back on success
        } catch (error) {
            window.alert(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    

    return (
    <Container  style={{ minHeight: '100vw', minWidth: '100vw', backgroundColor: '#E5ECF4', color:"#331832" }}>
        <div style={{ padding: '20px' }}>
            <div style={{ paddingLeft: "60px", paddingTop: "20px", display: 'flex', alignItems: 'center' }}>
                <FaArrowLeft onClick={goBack} style={{ cursor: 'pointer', marginRight: '10px' }} />
            </div>

            <Form className='pt-4' onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Department:</Form.Label>
                                <Form.Control as="select" {...register('department', { required: true })}>
                                    <option value="Electrical">Electrical</option>
                                    <option value="Mechanical">Mechanical</option>
                                    <option value="Engine Recon">Engine Recon</option>
                                    <option value="Machine Shop">Machine Shop</option>
                                    <option value="Office">Office</option>
                                    <option value="Afloat Repair">Afloat Repair</option>
                                    <option value="Engine Overhauling">Engine Overhauling</option>
                                    <option value="Transport">Transport</option>
                                    <option value="EDLC">EDLC</option>
                                </Form.Control>
                            {errors.department && <p>This field is required</p>}
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Location:</Form.Label>
                                <Form.Control as="select" {...register('location', { required: true })}>
                                    <option value="Keppel Tuas">Keppel Tuas</option>
                                    <option value="Kim Heng">Kim Heng</option>
                                    <option value="Changi">Changi</option>
                                    <option value="Anchorage">Anchorage</option>
                                    <option value="Baker Engineering">Baker Engineering</option>
                                    <option value="Changi Naval Base">Changi Naval Base</option>
                                    <option value="GOM">GOM</option>
                                    <option value="Keppel Benoi">Keppel Benoi</option>
                                    <option value="Loyang">Loyang</option>
                                    <option value="Megayard - TBY">Megayard - TBY</option>
                                    <option value="Mencast">Mencast</option>
                                    <option value="Mooreast">Mooreast</option>
                                    <option value="Pandan - ASL ">Pandan - ASL </option>
                                    <option value="Pandan - Pacific radiance ">Pandan - Pacific radiance </option>
                                    <option value="Pax ocean">Pax ocean</option>
                                    <option value="PSA">PSA</option>
                                    <option value="Sembawang ">Sembawang </option>
                                    <option value="Smit yard">Smit yard</option>
                                    <option value="SSE Yard">SSE Yard</option>
                                    <option value="ST Benoi">ST Benoi</option>
                                    <option value="ST Tuas">ST Tuas</option>
                                    <option value="ST Tuas Gul">ST Tuas Gul</option>
                                    <option value="Workshop - Tuas">Workshop - Tuas</option>
                                    <option value="Overseas">Overseas</option>
                                </Form.Control>
                            {errors.location && <p>This field is required</p>}
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Type:</Form.Label>
                                <Form.Control as="select" {...register('type', { required: true })}>
                                    <option value="Daily Meeting">DAILY TOOLBOX MEETING AND PPE RECORD</option>
                                    <option value="Contractors Meeting">CONTRACTORS TOOLBOX MEETING AND PPE RECORD</option>
                                    <option value="Transport Meeting">TRANSPORT MEETING RECORD</option>
                                </Form.Control>
                            {errors.location && <p>This field is required</p>}
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Date and Time:</Form.Label>
                                <Form.Control type="datetime-local" {...register('dateTime', { required: true })} />
                            {errors.dateTime && <p>This field is required</p>}
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Vessel:</Form.Label>
                                <Form.Control type="text" {...register('vessel', { required: true })} disabled />
                            {errors.vessel && <p>This field is required</p>}
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>RA.No:</Form.Label>
                                <Controller
                                name="raNumber"
                                control={control}
                                render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={raOptions}
                                            value={raOptions.find(option => option.value === field.value)}
                                            onChange={(selected) => {
                                                field.onChange(selected.value);
                                                setValue('topic', selected.topic); // Set the topic when RA number changes
                                            }}
                                        />
                                )}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>IPC Number:</Form.Label>
                        <Controller
                            name="ipcNumber"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={ipcOptions}
                                    value={ipcOptions.find(option => option.value === field.value)}
                                    onChange={(selected) => {
                                        field.onChange(selected.value);
                                        setValue('ipcNumber', selected.value); // Set the IPC number
                                        setValue('vessel', ipcData[selected.value]); // Set the vessel name based on the selected IPC number
                                    }}
                                />
                            )}
                        />
                    </Form.Group>
                </Col>
            </Row>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Topic:</Form.Label>
                                <Form.Control as="textarea" {...register('topic')} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <Button onClick={() => setShowModal(true)}>Add Employee</Button>
                <Button style={{margin: "10px"}} disabled={!raExists} onClick={openRa}> View RA </Button>
                <EmployeeModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    onEmployeeSubmit={addEmployee}
                    employeeMap={employeeMap}
                />

                {employees.length > 0 && (
                    <div>
                        {employees.map((employee, index) => (
                            <Row className='pt-3' key={index}>
                                <Col xs={12} md={3}>{employee.permitNumber}</Col>
                                <Col xs={12} md={3}>{employee.name}</Col>
                                <Col xs={12} md={3}>
                                    {Object.entries(employee.ppe).filter(([_, value]) => value).map(([key, _]) => <span key={key}>{key + ", " }</span>)}
                                </Col>
                                <Col xs={12} md={3}>
                                    {employee.signature ? <span>&#10004; Completed</span> : <span>Not Signed</span>}

                                </Col>
                            </Row>
                        ))}
                    </div>
                )}

                <Row>
                    <Col>
                        I hereby Acknowledge that the above statements are true and correct to the best of my knowledge.
                    </Col>
                    <Col>
                        <Form.Group>
                        <Row>
                            <Col>
                                <Form.Group>
                                <Form.Label>Created by:</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        value={localStorage.getItem('username')}
                                        disabled
                                    />
                                <input 
                                        type="hidden" 
                                        {...register('author')}
                                        value={localStorage.getItem('username')}
                                    />

                                {errors.createdBy && <p>This field is required</p>}
                                </Form.Group>
                            </Col>
                            </Row>
                            <br></br>
                            <SignatureCanvas ref={authorSigRef}
                                penColor='black'
                                canvasProps={{ width: 300, height: 100, className: 'sigCanvas', style: { border: "2px solid black" } }}
                            />
                            <div style={{cursor: 'pointer',}} onClick={() => authorSigRef.current.clear()}>
                            <FaTimes /> 
                            </div>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Trade  Supervisor</Form.Label>
                                <Form.Label> Name </Form.Label>
                                    <Form.Control type="text" {...register(`.nameSupervisor`)} />
                            <br></br>
                            <SignatureCanvas ref={supervisorSigRef}
                                penColor='black'
                                canvasProps={{ width: 300, height: 100, className: 'sigCanvas', style: { border: "2px solid black" } }}
                            />
                            <div style={{cursor: 'pointer',}} onClick={() => supervisorSigRef.current.clear()}>
                                <FaTimes /> 
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end" style={{ paddingTop: '10px' }}>
                        <Button style={{ backgroundColor: '#383631', borderColor: '#383631' }} disabled={isSubmitting} type="submit">Submit For Approval</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    </Container>
    );
};

export default ToolboxForm;
