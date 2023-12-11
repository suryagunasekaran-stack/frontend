import React,  {useRef} from 'react';
import { useForm } from 'react-hook-form';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';

const TaskArrangementForm = () => {
    // eslint-disable-next-line
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data); // Replace with your submit logic
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
                            <Form.Label>Date and Time:</Form.Label>
                            <Form.Control type="datetime-local" {...register('dateTime', { required: true })} />
                            {errors.dateTime && <p>This field is required</p>}
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
                            <Form.Label>Risk assesment Number:</Form.Label>
                            <Form.Control type="number" {...register('raNumber')} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col > Serial Number </Col>
                    <Col > Permits and Task Specific Work Plans </Col>
                    <Col ></Col>
                    <Col ></Col>
                    <Col ></Col>
                    <Col >Remark</Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 1 </Col>
                    <Col > Toolbox / RA briefing attendance record </Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 2 </Col>
                    <Col > Life vest for Embarkation/Disembarkation/Work </Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 3 </Col>
                    <Col > Tools bag (Loose items are packed in bags) </Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 4 </Col>
                    <Col > PPE's - Helmet with chin strap, Life vest, Gloves, Coverall,
                            Slip-resistant shoes </Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 5 </Col>
                    <Col > All electrical tools, equipment’s and cables in good working
                            Condition and tested</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 6 </Col>
                    <Col > Hot work Permit with MPA Gas free certificate arranged</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 7 </Col>
                    <Col > Gas hoses, pressure regulator fitted with flash back arrestor &
                        non-return valve, welding cables in good condition and tested</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 8 </Col>
                    <Col > Gas cylinders secured in upright position, use lashing straps
and placed together in a pallet with valid tag</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 9 </Col>
                    <Col > Fire-cloth, spark igniter gun, and soap solution to do leak test</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 10 </Col>
                    <Col > Reflective vest (Fire watch, CSA, Lifting crew)</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 11 </Col>
                    <Col > Entry into confined space permit arranged</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 12 </Col>
                    <Col > Appropriate Portable Gas Detector in good condition and
                            calibrated</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 13 </Col>
                    <Col > Confined Space Attendant with walkie talkie and attendance
record</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 14 </Col>
                    <Col > Ventilation equipment arranged</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 15 </Col>
                    <Col > Lighting equipment arranged</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 16 </Col>
                    <Col > Fire proof lighting for explosive atmosphere</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 17 </Col>
                    <Col > All Lifting Appliances and Gears have test certificate and valid
tag</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 18 </Col>
                    <Col > Material Handling (Lifting aids, Team/buddy lifting)</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 19 </Col>
                    <Col > Use tag ropes to control the load swing</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 20 </Col>
                    <Col > All lifting devices and equipment shall be visually examined
before use.</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 21 </Col>
                    <Col > All people shall be kept clear of overhead (suspended) loads and
areas of potential impact.</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 22 </Col>
                    <Col > Full body harness (double lanyard with shock absorber attached
to a suitable anchor point.)</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 23 </Col>
                    <Col > Self-Retractable Life Line shall lock and limit the arrest force to
a maximum of 6kN</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 24 </Col>
                    <Col > Hazardous / Volatile / Corrosive material and solvent safety data
sheet available if chemicals involved</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>

                <Row className='pt-3'>
                    <Col xs={2} md={2} lg={2} xl={2} > 25 </Col>
                    <Col > Chemical resistant suit / Apron / Gloves / Respirator</Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Group>
                    <Form.Label>Choose an option</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="YES"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                        />
                </Form.Group>
                </Col>
                    <Col >
                        <Form.Group>
                            <Form.Control type="text" {...register('remark')} />
                        </Form.Group>            
                    </Col>
                </Row>
            <Row>
                <Col>
                    I herby Acknowledge that the above statements are true and correct to the best of my knowledge.
                </Col>
                <Col>
                        <Form.Group>
                            <Form.Label>Name & Signature Job Coordinator</Form.Label>
                            <Form.Label>Name </Form.Label>
                            <Form.Control type="text" {...register(`.nameCoordinator`)} />
                            <br></br>
                            <SignatureCanvas ref={sigCanvasRef}
                            onEnd={saveSignature}
                                penColor='black'
                                canvasProps={{ width: 300, height: 100, className: 'sigCanvas', style: { border: "2px solid black" } }}
                            />
                            <Button onClick={clearSignature}>Clear Signature</Button>
                        </Form.Group>
                </Col>
                <Col>
                        <Form.Group>
                            <Form.Label>Trade Supervisor</Form.Label>
                            <Form.Label>Name </Form.Label>
                            <Form.Control type="text" {...register(`.nameSupervisor`)} />
                            <br></br>
                            <SignatureCanvas ref={sigCanvasRef}
                            onEnd={saveSignature}
                                penColor='black'
                                canvasProps={{ width: 300, height: 100, className: 'sigCanvas', style: { border: "2px solid black" } }}
                            />
                            <Button onClick={clearSignature}>Clear Signature</Button>
                        </Form.Group>
                </Col>
            </Row>
            
            <Row className='pt-5'>
            <Button className='d-flex justify-content-center align-items-center' type="submit">Submit</Button>
            </Row>
            </Form>
        </Container>
    );
};

export default TaskArrangementForm;
