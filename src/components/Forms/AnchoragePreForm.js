import React,  {useRef, useState, useEffect} from 'react';
import { useForm,  useFieldArray, Controller } from 'react-hook-form';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';
import Select from 'react-select';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TaskArrangementForm = () => {
    // eslint-disable-next-line
    const [raData, setRaData] = useState([]); // State to store RA.No data
    const authorSigRef = useRef(null);
    const supervisorSigRef = useRef(null);
    const navigate = useNavigate();
    const clearSignature = () => {
        authorSigRef.current.clear();
    };
    const apiUrl = process.env.REACT_APP_API_URL;
    const { control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
        defaultValues: {
          items: [{}]
        }
      });
    
      const { fields } = useFieldArray({
        control,
        name: "items",
      });

      const goBack = () => {
        navigate(-1); // Navigates to the previous page
    };

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

    const onSubmit = async (data) => {
        try {
            const authorSignature = authorSigRef.current?.getTrimmedCanvas().toDataURL('image/png');
            const supervisorSignature = supervisorSigRef.current?.getTrimmedCanvas().toDataURL('image/png');
            const token = localStorage.getItem('token');

            const formData = new FormData();

            // Append text fields
            Object.keys(data).forEach(key => {
                if (key !== 'images') {
                    formData.append(key, data[key]);
                }
            });
    
            // Append signatures
            formData.append('authorSignature', authorSignature);
            formData.append('supervisorSignature', supervisorSignature);
    
            // Append images
            if (data.images && data.images.length) {
                for (const file of data.images) {
                    formData.append('images', file);
                }
            }
    
            const response = await fetch(`${apiUrl}/anchorpreformsubmit`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
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

    useEffect(() => {
        fetchRaData();
    }, []);

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

                <Row>
                    <Col > Serial Number </Col>
                    <Col > Permits and Task Specific Work Plans </Col>
                    <Col ></Col>
                    <Col ></Col>
                    <Col ></Col>
                </Row>

                {fields.map((item, index) => (
                <Row className='pt-3' >
                    <Row className='pt-3' >
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
                            {...register(`items[${index}].ToolboxRAAttendanceRecord`)}
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="toolboxRAAttendanceRecord"
                            id="formHorizontalRadios2"
                            value="NO"
                             {...register(`items[${index}].ToolboxRAAttendanceRecord`)}
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="toolboxRAAttendanceRecord"
                            id="formHorizontalRadios3"
                            value="N/A"
                             {...register(`items[${index}].ToolboxRAAttendanceRecord`)}
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
                            {...register(`items[${index}].LifevestforEmbarkation`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="LifevestforEmbarkation"
                            id="LifevestforEmbarkation2"
                            {...register(`items[${index}].LifevestforEmbarkation`)}
                            value="NO" 
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="LifevestforEmbarkation"
                            id="LifevestforEmbarkation3"
                            {...register(`items[${index}].LifevestforEmbarkation`)}
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
                            {...register(`items[${index}].Toolsbag`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Toolsbag"
                            id="Toolsbag2"
                            {...register(`items[${index}].Toolsbag`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Toolsbag"
                            id="Toolsbag3"
                            {...register(`items[${index}].Toolsbag`)}
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
                            {...register(`items[${index}].Helmetwithchin`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Helmetwithchin"
                            id="Helmetwithchin2"
                            {...register(`items[${index}].Helmetwithchin`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Helmetwithchin"
                            id="Helmetwithchin3"
                            {...register(`items[${index}].Helmetwithchin`)}
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
                            {...register(`items[${index}].Allelectricaltools`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Allelectricaltools"
                            id="Allelectricaltools2"
                            {...register(`items[${index}].Allelectricaltools`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Allelectricaltools"
                            id="Allelectricaltools3"
                            {...register(`items[${index}].Allelectricaltools`)}
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
                            {...register(`items[${index}].HotworkPermit`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="HotworkPermit"
                            id="HotworkPermit2"
                            {...register(`items[${index}].HotworkPermit`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="HotworkPermit"
                            id="HotworkPermit3"
                            {...register(`items[${index}].HotworkPermit`)}
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
                            {...register(`items[${index}].Gashoses`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Gashoses"
                            id="Gashoses2"
                            {...register(`items[${index}].Gashoses`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Gashoses"
                            id="Gashoses3"
                            {...register(`items[${index}].Gashoses`)}
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
                            {...register(`items[${index}].Gascylinders`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Gascylinders"
                            id="Gascylinders2"
                            {...register(`items[${index}].Gascylinders`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Gascylinders"
                            id="Gascylinders3"
                            {...register(`items[${index}].Gascylinders`)}
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
                            {...register(`items[${index}].Sparkigniter`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="sparkigniter"
                            id="sparkigniter2"
                            {...register(`items[${index}].Sparkigniter`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="sparkigniter"
                            id="sparkigniter3"
                            {...register(`items[${index}].Sparkigniter`)}
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
                            {...register(`items[${index}].Reflectivevest`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Reflectivevest"
                            id="Reflectivevest2"
                            {...register(`items[${index}].Reflectivevest`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Reflectivevest"
                            id="Reflectivevest3"
                            {...register(`items[${index}].Reflectivevest`)}
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
                            {...register(`items[${index}].Entryintoconfined`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Entryintoconfined"
                            id="Entryintoconfined2"
                            {...register(`items[${index}].Entryintoconfined`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Entryintoconfined"
                            id="Entryintoconfined3"
                            {...register(`items[${index}].Entryintoconfined`)}
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
                            {...register(`items[${index}].AppropriatePortable`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="AppropriatePortable"
                            id="AppropriatePortable2"
                            {...register(`items[${index}].AppropriatePortable`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="AppropriatePortable"
                            id="AppropriatePortable3"
                            {...register(`items[${index}].AppropriatePortable`)}
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
                            {...register(`items[${index}].ConfinedSpace`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="ConfinedSpace"
                            id="ConfinedSpace2"
                            {...register(`items[${index}].ConfinedSpace`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="ConfinedSpace"
                            id="ConfinedSpace3"
                            {...register(`items[${index}].ConfinedSpace`)}
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
                            {...register(`items[${index}].Ventilationequipment`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Ventilationequipment"
                            id="Ventilationequipment2"
                            {...register(`items[${index}].Ventilationequipment`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Ventilationequipment"
                            id="Ventilationequipment3"
                            {...register(`items[${index}].Ventilationequipment`)}
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
                            {...register(`items[${index}].Lightingequipment`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Lightingequipment"
                            id="Lightingequipment2"
                            {...register(`items[${index}].Lightingequipment`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Lightingequipment"
                            id="Lightingequipment3"
                            {...register(`items[${index}].Lightingequipment`)}
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
                            {...register(`items[${index}].Fireproof`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Fireproof"
                            id="Fireproof2"
                            {...register(`items[${index}].Fireproof`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Fireproof"
                            id="Fireproof3"
                            {...register(`items[${index}].Fireproof`)}
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
                            {...register(`items[${index}].AllLifting`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="AllLifting"
                            id="AllLifting2"
                            {...register(`items[${index}].AllLifting`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="AllLifting"
                            id="AllLifting3"
                            {...register(`items[${index}].AllLifting`)}
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
                           {...register(`items[${index}].MaterialHandling`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="MaterialHandling"
                            id="MaterialHandling2"
                           {...register(`items[${index}].MaterialHandling`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="MaterialHandling"
                            id="MaterialHandling3"
                           {...register(`items[${index}].MaterialHandling`)}
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
                            {...register(`items[${index}].Usetag`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Usetag"
                            id="Usetag2"
                            {...register(`items[${index}].Usetag`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Usetag"
                            id="Usetag3"
                            {...register(`items[${index}].Usetag`)}
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
                            {...register(`items[${index}].Alllifting`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Alllifting"
                            id="Alllifting2"
                            {...register(`items[${index}].Alllifting`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Alllifting"
                            id="Alllifting3"
                            {...register(`items[${index}].Alllifting`)}
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
                            {...register(`items[${index}].Allpeople`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Allpeople"
                            id="Allpeople2"
                            {...register(`items[${index}].Allpeople`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Allpeople"
                            id="Allpeople3"
                            {...register(`items[${index}].Allpeople`)}
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
                           {...register(`items[${index}].Fullbodyharness`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Fullbodyharness"
                            id="Fullbodyharness2"
                           {...register(`items[${index}].Fullbodyharness`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Fullbodyharness"
                            id="Fullbodyharness3"
                           {...register(`items[${index}].Fullbodyharness`)}
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
                            {...register(`items[${index}].RetractableLife`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="RetractableLife"
                            id="RetractableLife2"
                            {...register(`items[${index}].RetractableLife`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="RetractableLife"
                            id="RetractableLife3"
                            {...register(`items[${index}].RetractableLife`)}
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
                            {...register(`items[${index}].Corrosivematerial`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Corrosivematerial"
                            id="Corrosivematerial2"
                            {...register(`items[${index}].Corrosivematerial`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Corrosivematerial"
                            id="Corrosivematerial3"
                            {...register(`items[${index}].Corrosivematerial`)}
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
                            {...register(`items[${index}].Chemicalresistant`)}
                            value="YES"
                        />
                        <Form.Check
                            type="radio"
                            label="NO"
                            name="Chemicalresistant"
                            id="Chemicalresistant2"
                            {...register(`items[${index}].Chemicalresistant`)}
                            value="NO"
                        />
                        <Form.Check
                            type="radio"
                            label="N/A"
                            name="Chemicalresistant"
                            id="Chemicalresistant3"
                            {...register(`items[${index}].Chemicalresistant`)}
                            value="N/A"
                        />
                </Form.Group>
                </Col>
 
                </Row>

                </Row>
            ))}
            
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Upload Images:</Form.Label>
                        <Form.Control type="file" accept="image/*" multiple {...register('images', { required: false })} />
                        {errors.images && <p>At least one image is required</p>}
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
            </div>
        </Container>
    );
};

export default TaskArrangementForm;
