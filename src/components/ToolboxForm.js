import React, {useRef} from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';

const ToolboxForm = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const sigCanvasRef = useRef({});
    const clearSignature = () => {
        sigCanvasRef.current.clear();
    };

    const saveSignature = () => {
        if (sigCanvasRef.current) {
            // eslint-disable-next-line
            const signature = sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png');
            // Use this signature data as needed
        }
    };
    const onSubmit = data => console.log(data);
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    return (
        <Container>
            <Form className='pt-4' onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Department:</Form.Label>
                            <Form.Control as="select" {...register('department', { required: true })}>
                                <option value="electrical">Electrical</option>
                                <option value="mechanical">Mechanical</option>
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
                                <option value="workshop">Workshop</option>
                                <option value="changi">Changi</option>
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
                            <Form.Label>Topic:</Form.Label>
                            <Form.Control as="textarea" {...register('topic')} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Ra.No:</Form.Label>
                            <Form.Control type="number" {...register('raNumber')} />
                        </Form.Group>
                    </Col>
                </Row>

                {fields.map((item, index) => (
                <Row className='pt-5' key={item.id}>
                    <Col className='d-flex justify-content-center align-items-center' xs={1} md={1} lg={1} xl={1}>{index + 1}</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                        <Form.Group controlId={`PermitNumber-${index}`}>
                            <Form.Label>Permit Number</Form.Label>
                            <Form.Control type="text" {...register(`items[${index}].permitNumber`)} />
                        </Form.Group>
                    </Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                        <Form.Group controlId={`Name-${index}`}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" {...register(`items[${index}].name`)} />
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
                            <SignatureCanvas ref={sigCanvasRef}
                            onEnd={saveSignature}
                                penColor='black'
                                canvasProps={{ width: 300, height: 100, className: 'sigCanvas', style: { border: "2px solid black" } }}
                            />
                            <Button onClick={clearSignature}>Clear Signature</Button>
                        </Form.Group>
                    </Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                        <Button type="button" onClick={() => remove(index)}>Remove</Button>
                    </Col>
                </Row>
            
))}

<Button type="button" onClick={() => append({ permitNumber: '', name: '', ppe: {}, signature: '' })} className="me-2" >
    Add More
</Button>

    <Button type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default ToolboxForm;
