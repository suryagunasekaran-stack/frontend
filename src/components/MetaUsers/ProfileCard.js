import React from 'react';
import { Card, Col, Table } from 'react-bootstrap';
import Carousel from 'nuka-carousel';
import CoursesTable from './CoursesTable';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';

const ProfileCard = ({ item }) => {
    const coursesWithExpiry = item.CoursesAndCertificates.filter(course => course.expiryDate);
    const coursesWithoutExpiry = item.CoursesAndCertificates.filter(course => !course.expiryDate);

    return (
        <Col className="mb-4">
            <Card className="metaFileUsersCard">
                <Card.Body className="metaFileUsersCardBody">
                    <Carousel 
                        swiping
                        wrapAround={true} 
                        renderCenterLeftControls={({ previousSlide }) => <ArrowLeft previousSlide={previousSlide} />} 
                        renderCenterRightControls={({ nextSlide }) => <ArrowRight nextSlide={nextSlide} />}
                    >
                        <div className="metaFileUsersCardContent">
                            <Card.Img 
                                variant="top" 
                                src={item.profileImg || 'https://ui-avatars.com/api/?name=Unknown&color=7F9CF5&background=EBF4FF'} 
                                className="card-img"
                            />
                            <Card.Title className="card-title"> {item.NAME}</Card.Title>
                            
                            <Table className='metafilecustomtable'>
                                <tbody>
                                    <tr>
                                        <td>Employee Number:</td>
                                        <td>{item['EMP NO']}</td>
                                    </tr>
                                    <tr>
                                        <td>Department:</td>
                                        <td>{item.DEPARTMENT}</td>
                                    </tr>
                                    <tr>
                                        <td>Company:</td>
                                        <td>{item.COMPANY}</td>
                                    </tr>
                                    <tr>
                                        <td>Designation:</td>
                                        <td>{item['MOM OCCUPATION']}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <Table className='metafilecustomtable'>
                            <tbody>
                                <tr>
                                    <td>Email:</td>
                                    <td>{item['EMAIL ID']}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number:</td>
                                    <td>{item['NEW CONTACT NUMBER']}</td>
                                </tr>
                            </tbody>
                        </Table>

                        {coursesWithExpiry.length > 0 && (
                            <>
                                <h5>Courses with Expiry</h5>
                                <CoursesTable courses={coursesWithExpiry} withExpiry={true} />
                            </>
                        )}
                        
                        {coursesWithoutExpiry.length > 0 && (
                            <>
                                <h5>Courses without Expiry</h5>
                                <CoursesTable courses={coursesWithoutExpiry} withExpiry={false} />
                            </>
                        )}
                    </Carousel>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ProfileCard;
