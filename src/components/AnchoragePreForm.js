import React,  {useRef} from 'react';
import { useForm } from 'react-hook-form';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';

const TaskArrangementForm = () => {
    // eslint-disable-next-line
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const authorSigRef = useRef(null);
    const supervisorSigRef = useRef(null);
    const clearSignature = () => {
        authorSigRef.current.clear();
    };

    const onSubmit = async (data) => {
        try {
            const authorSignature = authorSigRef.current?.getTrimmedCanvas().toDataURL('image/png');
            const supervisorSignature = supervisorSigRef.current?.getTrimmedCanvas().toDataURL('image/png');
            const token = localStorage.getItem('token');

            const formData = {
                ...data,
                authorSignature,
                supervisorSignature
            };

            const response = await fetch('http://localhost:3000/anchorpreformsubmit', { // Replace with your server URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                const responseData = await response.json();
                console.log('Server response:', responseData);
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
                            name="toolboxRAAttendanceRecord"
                            id="formHorizontalRadios1"
                            value="YES"
                            {...register("toolboxRAAttendanceRecord")}
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="toolboxRAAttendanceRecord"
                            id="formHorizontalRadios2"
                            value="NO"
                            {...register("toolboxRAAttendanceRecord")}
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="toolboxRAAttendanceRecord"
                            id="formHorizontalRadios3"
                            value="N/A"
                            {...register("toolboxRAAttendanceRecord")}
                        />
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
                            name="LifevestforEmbarkation"
                            id="LifevestforEmbarkation1"
                            {...register("LifevestforEmbarkation")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="LifevestforEmbarkation"
                            id="LifevestforEmbarkation2"
                            {...register("LifevestforEmbarkation")}
                            value="NO" 
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="LifevestforEmbarkation"
                            id="LifevestforEmbarkation3"
                            {...register("LifevestforEmbarkation")}
                            value="N/A"
                        />
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
                            name="Toolsbag"
                            id="Toolsbag1"
                            {...register("Toolsbag")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Toolsbag"
                            id="Toolsbag2"
                            {...register("Toolsbag")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Toolsbag"
                            id="Toolsbag3"
                            {...register("Toolsbag")}
                            value="N/A"
                        />
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
                            name="Helmetwithchin"
                            id="Helmetwithchin1"
                            {...register("Helmetwithchin")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Helmetwithchin"
                            id="Helmetwithchin2"
                            {...register("Helmetwithchin")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Helmetwithchin"
                            id="Helmetwithchin3"
                            {...register("Helmetwithchin")}
                            value="N/A"
                        />
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
                            name="Allelectricaltools"
                            id="Allelectricaltools1"
                            {...register("Allelectricaltools")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Allelectricaltools"
                            id="Allelectricaltools2"
                            {...register("Allelectricaltools")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Allelectricaltools"
                            id="Allelectricaltools3"
                            {...register("Allelectricaltools")}
                            value="N/A"
                        />
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
                            name="HotworkPermit"
                            id="HotworkPermit1"
                            {...register("HotworkPermit")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="HotworkPermit"
                            id="HotworkPermit2"
                            {...register("HotworkPermit")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="HotworkPermit"
                            id="HotworkPermit3"
                            {...register("HotworkPermit")}
                            value="N/A"
                        />
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
                            name="Gashoses"
                            id="Gashoses1"
                            {...register("Gashoses")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Gashoses"
                            id="Gashoses2"
                            {...register("Gashoses")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Gashoses"
                            id="Gashoses3"
                            {...register("Gashoses")}
                            value="N/A"
                        />
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
                            name="Gascylinders"
                            id="Gascylinders1"
                            {...register("Gascylinders")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Gascylinders"
                            id="Gascylinders2"
                            {...register("Gascylinders")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Gascylinders"
                            id="Gascylinders3"
                            {...register("Gascylinders")}
                            value="N/A"
                        />
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
                            name="sparkigniter"
                            id="sparkigniter1"
                            {...register("sparkigniter")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="sparkigniter"
                            id="sparkigniter2"
                            {...register("sparkigniter")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="sparkigniter"
                            id="sparkigniter3"
                            {...register("sparkigniter")}
                            value="N/A"
                        />
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
                            name="Reflectivevest"
                            id="Reflectivevest1"
                            {...register("Reflectivevest")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Reflectivevest"
                            id="Reflectivevest2"
                            {...register("Reflectivevest")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Reflectivevest"
                            id="Reflectivevest3"
                            {...register("Reflectivevest")}
                            value="N/A"
                        />
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
                            name="Entryintoconfined"
                            id="Entryintoconfined1"
                            {...register("Entryintoconfined")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Entryintoconfined"
                            id="Entryintoconfined2"
                            {...register("Entryintoconfined")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Entryintoconfined"
                            id="Entryintoconfined3"
                            {...register("Entryintoconfined")}
                            value="N/A"
                        />
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
                            name="AppropriatePortable"
                            id="AppropriatePortable1"
                            {...register("AppropriatePortable")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="AppropriatePortable"
                            id="AppropriatePortable2"
                            {...register("AppropriatePortable")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="AppropriatePortable"
                            id="AppropriatePortable3"
                            {...register("AppropriatePortable")}
                            value="N/A"
                        />
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
                            name="ConfinedSpace"
                            id="ConfinedSpace1"
                            {...register("ConfinedSpace")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="ConfinedSpace"
                            id="ConfinedSpace2"
                            {...register("ConfinedSpace")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="ConfinedSpace"
                            id="ConfinedSpace3"
                            {...register("ConfinedSpace")}
                            value="N/A"
                        />
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
                            name="Ventilationequipment"
                            id="Ventilationequipment1"
                            {...register("Ventilationequipment")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Ventilationequipment"
                            id="Ventilationequipment2"
                            {...register("Ventilationequipment")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Ventilationequipment"
                            id="Ventilationequipment3"
                            {...register("Ventilationequipment")}
                            value="N/A"
                        />
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
                            name="Lightingequipment"
                            id="Lightingequipment1"
                            {...register("Lightingequipment")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Lightingequipment"
                            id="Lightingequipment2"
                            {...register("Lightingequipment")}
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Lightingequipment"
                            id="Lightingequipment3"
                            {...register("Lightingequipment")}
                            value="N/A"
                        />
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
                            name="Fireproof"
                            id="Fireproof1"
                            {...register("Fireproof")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Fireproof"
                            id="Fireproof2"
                            {...register("Fireproof")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Fireproof"
                            id="Fireproof3"
                            {...register("Fireproof")}
                            value="N/A"
                        />
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
                            name="AllLifting"
                            id="AllLifting1"
                            {...register("AllLifting")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="AllLifting"
                            id="AllLifting2"
                            {...register("AllLifting")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="AllLifting"
                            id="AllLifting3"
                            {...register("AllLifting")}
                            value="N/A"
                        />
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
                            name="MaterialHandling"
                            id="MaterialHandling1"
                            {...register("MaterialHandling")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="MaterialHandling"
                            id="MaterialHandling2"
                            {...register("MaterialHandling")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="MaterialHandling"
                            id="MaterialHandling3"
                            {...register("MaterialHandling")}
                            value="N/A"
                        />
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
                            name="Usetag"
                            id="Usetag1"
                            {...register("Usetag")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Usetag"
                            id="Usetag2"
                            {...register("Usetag")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Usetag"
                            id="Usetag3"
                            {...register("Usetag")}
                            value="N/A"
                        />
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
                            name="Alllifting"
                            id="Alllifting1"
                            {...register("Alllifting")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Alllifting"
                            id="Alllifting2"
                            {...register("Alllifting")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Alllifting"
                            id="Alllifting3"
                            {...register("Alllifting")}
                            value="N/A"
                        />
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
                            name="Allpeople"
                            id="Allpeople1"
                            {...register("Allpeople")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Allpeople"
                            id="Allpeople2"
                            {...register("Allpeople")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Allpeople"
                            id="Allpeople3"
                            {...register("Allpeople")}
                            value="N/A"
                        />
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
                            name="Fullbodyharness"
                            id="Fullbodyharness1"
                            {...register("Fullbodyharness")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Fullbodyharness"
                            id="Fullbodyharness2"
                            {...register("Fullbodyharness")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Fullbodyharness"
                            id="Fullbodyharness3"
                            {...register("Fullbodyharness")}
                            value="N/A"
                        />
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
                            name="RetractableLife"
                            id="RetractableLife1"
                            {...register("RetractableLife")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="RetractableLife"
                            id="RetractableLife2"
                            {...register("RetractableLife")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="RetractableLife"
                            id="RetractableLife3"
                            {...register("RetractableLife")}
                            value="N/A"
                        />
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
                            name="Corrosivematerial"
                            id="Corrosivematerial1"
                            {...register("Corrosivematerial")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Corrosivematerial"
                            id="Corrosivematerial2"
                            {...register("Corrosivematerial")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Corrosivematerial"
                            id="Corrosivematerial3"
                            {...register("Corrosivematerial")}
                            value="N/A"
                        />
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
                            name="Chemicalresistant"
                            id="Chemicalresistant1"
                            {...register("Chemicalresistant")}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Chemicalresistant"
                            id="Chemicalresistant2"
                            {...register("Chemicalresistant")}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Chemicalresistant"
                            id="Chemicalresistant3"
                            {...register("Chemicalresistant")}
                            value="N/A"
                        />
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
                            <SignatureCanvas ref={authorSigRef}
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
                            <SignatureCanvas ref={supervisorSigRef}
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
