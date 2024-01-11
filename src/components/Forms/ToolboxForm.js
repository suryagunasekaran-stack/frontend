import React, {useRef, useState, useEffect} from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { FaArrowLeft } from 'react-icons/fa';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';

const ToolboxForm = () => {
    const { register, control, handleSubmit, formState: { errors },setValue, watch, getValues } = useForm();
    const token = localStorage.getItem('token');
    const sigCanvasRef = useRef({});
    const authorSigRef = useRef(null);
    const supervisorSigRef = useRef(null);
    const navigate = useNavigate();
    const [raData, setRaData] = useState([]); // State to store RA.No data
    const [employeeData, setEmployeeData] = useState([]);
  

  // Function to fetch RA.No data from backend
  const fetchRaData = async () => {
    try {
      // Replace '/api/ra-data' with your actual API endpoint
      const apiUrl = process.env.REACT_APP_API_URL;
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        const response = await fetch(`${apiUrl}/getRaNumbers`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                // Add other headers as needed
            }
        });
      const data = await response.json();
      setRaData(data);
    } catch (error) {
      console.error('Error fetching RA data:', error);
    }
  };

  const fetchEmployeeData = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
      const response = await fetch(`${apiUrl}/getallname`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          // Add other headers as needed
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data)
      setEmployeeData(data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

    useEffect(() => {
        fetchRaData();
        fetchEmployeeData();
    }, []);

    

    // Format RA.No data for use with react-select
    const raOptions = raData.map(item => ({
        value: item['RA Ref. No.'],
        label: item['RA Ref. No.'],
        topic: item['INVENTORY OF WORK ACTIVITIES - CRITCAL']
    }));

    // Watch the RA number value
    const selectedRa = watch('raNumber');

    // Effect to update the topic when RA number changes
    useEffect(() => {
        const ra = raData.find(ra => ra['RA Ref. No.'] === selectedRa);
        if (ra) {
        setValue('topic', ra['INVENTORY OF WORK ACTIVITIES - CRITCAL']);
        }
    }, [selectedRa, raData, setValue]);

    const goBack = () => {
        navigate(-1); // Navigates to the previous page
    };
    // Function to clear a specific signature
    // eslint-disable-next-line
    const clearSignature = (index) => {
        if (sigCanvasRef.current[index]) {
            sigCanvasRef.current[index].clear();
        }
    };

    const handleSearch = async (index) => {
        const empNumber = getValues(`items[${index}].permitNumber`);
        const employee = employeeData.find(emp => emp['EMP NO.'] === empNumber);
        if (employee) {
          setValue(`items[${index}].name`, employee.NAME);
        }
      };


    
    const onSubmit = async (data) => {
        try {
            const transformedData = data.items.map(item => {
                const selectedPPE = Object.keys(item.ppe).filter(ppeKey => item.ppe[ppeKey]);
                return { ...item, ppe: selectedPPE };
            });
            data.items = transformedData;
            
            const itemsWithSignatures = data.items.map((item, index) => {
                let signature = '';
                if (sigCanvasRef.current[index]) {
                    signature = sigCanvasRef.current[index].getTrimmedCanvas().toDataURL('image/png');
                }
                return { ...item, signature };
            });
            
            const authorSignature = authorSigRef.current?.getTrimmedCanvas().toDataURL('image/png');
            const supervisorSignature = supervisorSigRef.current?.getTrimmedCanvas().toDataURL('image/png');


            const formData = {
                ...data,
                items: itemsWithSignatures,
                authorSignature,
                supervisorSignature
            };
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/toolboxformsubmit`, { // Replace with your server URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                 // eslint-disable-next-line
                const responseData = await response.json();
                alert('Success: Operation completed successfully.');
            } else {
                console.error('Server error:', response.status);
                alert('Error: Operation failed. Status code: ' + response.status);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });


    return (
    <Container  style={{ minHeight: '100vw', minWidth: '100vw', backgroundColor: '#E5ECF4', color:"#331832" }}>
    <div style={{ padding: '20px' }}>
      <div style={{ paddingLeft: "60px", paddingTop: "20px", display: 'flex', alignItems: 'center' }}>
        <FaArrowLeft onClick={goBack} style={{ cursor: 'pointer', marginRight: '10px' }} />
        {/* Rest of your content */}
      </div>
            <Form className='pt-4' onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Department:</Form.Label>
                            <Form.Control as="select" {...register('department', { required: true })}>
                                <option value="Electrical">Electrical</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Piping">Piping</option>
                                <option value="Engine">Engine</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Machine Shop">Machine Shop</option>
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
                                <option value="Tuas">Tuas</option>
                                <option value="Yard">Yard</option>
                                <option value="Changi">Changi</option>
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
                            <Form.Control type="text" {...register('vessel', { required: true })} />
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
                            onChange={(selected) => field.onChange(selected.value)}
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

                {fields.map((item, index) => (
                <Row className='pt-5' key={item.id}>
                    <Col className='d-flex justify-content-center align-items-center' xs={1} md={1} lg={1} xl={1}>{index + 1}</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group controlId={`PermitNumber-${index}`}>
                    <Form.Label>Employee / Permit Number</Form.Label>
                    <Form.Control type="text" {...register(`items[${index}].permitNumber`)} />
                    <div
                    onClick={() => handleSearch(index)}
                    style={{ cursor: 'pointer' }}
                    >
                    <FaSearch /> {/* Search icon from react-icons */}
                    </div>
                    </Form.Group>
                    </Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                            <Form.Group controlId={`Name-${index}`}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" {...register(`items[${index}].name`)} disabled />
                    </Form.Group>
                    </Col>
                    <Col xs={2} md={2} lg={2} xl={2}>
                        <Form.Group >
                            <Form.Label>PPE</Form.Label>
                            {['Life Jacket', 'Body Harness', 'Safety Gear', 'Face Shield', 'Hand Gear', 'Others'].map(ppe => (
                                <Form.Check 
                                    key={ppe} 
                                    type="checkbox" 
                                    label={ppe} 
                                    {...register(`items[${index}].ppe.${ppe}`)} 
                                />
                            ))}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                                <Form.Label>Signature</Form.Label>
                                <SignatureCanvas
                                    ref={(el) => sigCanvasRef.current[index] = el}
                                    penColor='black'
                                    canvasProps={{ width: 300, height: 100, className: 'sigCanvas', style: { border: "2px solid black" } }}
                                />
                            <div style={{cursor: 'pointer',}} onClick={() => sigCanvasRef.current[index].clear()}>
                            <FaTimes /> 
                            </div>
                            </Form.Group>
                    </Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                             <div style={{cursor: 'pointer',}} onClick={() => remove(index)}>
                                <FaTimes /> 
                            </div>
                    </Col>
                </Row>
            
))}
                <Col className="d-flex justify-content-end"  style={{ paddingTop: '20px' }}>
                <div
                    onClick={() => append({ permitNumber: '', name: '', ppe: {}, signature: '' })}
                    style={{ cursor: 'pointer' }}
                    >
                    <FaPlus /> {/* Plus icon from react-icons */}
                    </div>
                </Col>


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
            <Button style={{ backgroundColor: '#383631', borderColor: '#383631' }} type="submit">Submit For Approval</Button>
        </Col>
    </Row>

            </Form>
            </div>
        </Container>
    );
};

export default ToolboxForm;
