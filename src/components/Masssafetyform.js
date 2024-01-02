import React, {useEffect, useState, useRef} from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';

function MassSafetyForm() {
  const { register, control, setValue, handleSubmit, formState: { errors }, getValues } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "employees"
  });
  const sigCanvasRef = useRef({});
  const [employeeData, setEmployeeData] = useState({});


  const fetchEmployeeData = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      const response = await fetch('http://localhost:3000/getallname', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
        const employeeLookup = {};
        data.forEach(emp => {
        employeeLookup[emp["EMP NO."]] = emp["NAME"];
        });
      setEmployeeData(employeeLookup);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const lookupEmployeeName = (index) => {
    const employeeNumberField = `employees[${index}].employeeNumber`;
    const number = getValues(employeeNumberField); // Get the current value of the employee number field
    const name = employeeData[number];
    
    if (name) {
      setValue(`employees[${index}].name`, name);
    } else {
      // Clear the name field if the number does not exist
      setValue(`employees[${index}].name`, '');
    }
  };

  const onSubmit =  async (data) => {

    try {
        const token = localStorage.getItem('token');
    const itemsWithSignatures = data.employees.map((item, index) => {
        let signature = '';
        if (sigCanvasRef.current[index]) {
            signature = sigCanvasRef.current[index].getTrimmedCanvas().toDataURL('image/png');
        }
        return { ...item, signature };
    });
    const formData = {
        ...data,
        employees: itemsWithSignatures,
    };
    const response = await fetch('http://localhost:3000/savemassform', { // Replace with your server URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
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

  return (
    <Container>
      <Form className='pt-4' onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Trade:</Form.Label>
              <Form.Control as="select" {...register('trade', { required: true })}>
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
              {errors.department && <p>This field is required</p>}
            </Form.Group>
          </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group>
                    <Form.Label>Date and Time:</Form.Label>
                    <Form.Control type="datetime-local" {...register('date', { required: true })} />
                    {errors.dateTime && <p>This field is required</p>}
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group>
                    <Form.Label>Topic:</Form.Label>
                    <Form.Control as="textarea" {...register('topic')} />
                </Form.Group>
            </Col>
        </Row>


        {fields.map((field, index) => (
          <Row key={field.id}>
<Col>
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control 
          type="text" 
          {...register(`employees[${index}].name`)} 
          disabled // Disables the name input
        />
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group>
        <Form.Label>Employee Number:</Form.Label>
        <Form.Control
          type="number"
          {...register(`employees[${index}].employeeNumber`)}
        />
      </Form.Group>
    </Col>
    <Col md="auto">
      <Button 
        variant="primary" 
        onClick={() => lookupEmployeeName(index)}
        className="mt-4" // Adjust margin-top to align with the form fields
      >
        Search
      </Button>
    </Col>
    <Col>
                        <Form.Group>
                                <Form.Label>Signature</Form.Label>
                                <SignatureCanvas
                                    ref={(el) => sigCanvasRef.current[index] = el}
                                    penColor='black'
                                    canvasProps={{ width: 300, height: 100, className: 'sigCanvas', style: { border: "2px solid black" } }}
                                />
                                <Button style={{ backgroundColor: 'red', borderColor: 'red' }} onClick={() => sigCanvasRef.current[index].clear()}>Clear Signature</Button>
                            </Form.Group>
                    </Col>

            <Col md={2} className="d-flex justify-content-center align-items-center">
              <Button variant="danger" onClick={() => remove(index)}>
                Remove
              </Button>
            </Col>
          </Row>
        ))}

        <Col className="d-flex justify-content-start" style={{ paddingRight: '10px' }}>
            <Button variant="secondary" type="button" onClick={() => append({ name: "", employeeNumber: "", signature: "" })}>
            Add Employee
            </Button>
        </Col>


    <Row>
        <Col className="d-flex justify-content-end" style={{ paddingTop: '10px' }}>
            <Button type="submit"> Submit For Approval </Button>
        </Col>
    </Row>
      </Form>
    </Container>
  );
}

export default MassSafetyForm;
