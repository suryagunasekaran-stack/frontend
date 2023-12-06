import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';

const TaskArrangementForm = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data); // Replace with your submit logic

    return (
        <Container>
            <Form className='pt-4' onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <Form.Group>
                        <Form.Label>Project/Vessel:</Form.Label>
                            <Form.Control type="text" {...register('vessel', { required: true })} />
                            {errors.vessel && <p>This field is required</p>}
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Work Description:</Form.Label>
                            <Form.Control type="text" {...register('workdescription', { required: true })} />
                            {errors.workdescription && <p>This field is required</p>}
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
                            <Form.Label>Department:</Form.Label>
                            <Form.Control type="text" {...register('department', { required: true })} />
                            {errors.department && <p>This field is required</p>}
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Risk assesment Number:</Form.Label>
                            <Form.Control type="number" {...register('raNumber')} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default TaskArrangementForm;
