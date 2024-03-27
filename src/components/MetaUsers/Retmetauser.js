import { useQuery } from 'react-query';
import moment from 'moment';
import React, { useState } from 'react';
import { Card, Table, Row, Col, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import '../../css/Metafileuser.css'
import Carousel from 'nuka-carousel';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Retmetauser() {

const [page, setPage] = useState(1);
// const [searchTerm, setSearchTerm] = useState('');
const limit = 12; // You can make this configurable

async function fetchmetadata() {
    
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiUrl}/getMetaData?page=${page}&limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Include the authorization token
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();

}
const getRemainingDaysBadge = (expiryDate) => {
    const end = moment(expiryDate, 'DD/MM/YYYY');
    const now = moment();
    const remainingDays = end.diff(now, 'days');
    let badgeVariant;
  
    if (remainingDays > 30) {
      badgeVariant = 'success'; // Green for more than 30 days
    } else if (remainingDays > 7) {
      badgeVariant = 'warning'; // Yellow for less than 30 but more than 7 days
    } else {
      badgeVariant = 'danger'; // Red for less than 7 days
    }
  
    return (
      <Badge bg={badgeVariant}>
        {remainingDays > 0 ? `${remainingDays} days remaining` : 'Expired'}
      </Badge>
    );
  };

const ArrowLeft = ({ previousSlide }) => (
    <FaArrowLeft onClick={previousSlide} className="carousel-arrow-left" />
  );
  const ArrowRight = ({ nextSlide }) => (
    <FaArrowRight onClick={nextSlide} className="carousel-arrow-right" />
  );

const { data: queryData, isLoading, isError, error } = useQuery(['fileData', page], fetchmetadata);
    // Add functions to navigate between pages
  const handleNext = () => {
    setPage(currentPage => currentPage + 1);
  };

  const handlePrevious = () => {
    setPage(currentPage => Math.max(1, currentPage - 1));
  };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   // Handler for search submission
//   const handleSearchSubmit = () => {
//     setPage(1); // Reset to first page on new search

//   };

  const renderCoursesTable = (courses, withExpiry = false) => (
    <Table borderless size="sm">
      <thead>
        <tr>
          <th>Course Name</th>
          {withExpiry ? <><th>Expiry Date</th><th>Status</th></> : <th>Date</th>}
        </tr>
      </thead>
      <tbody>
      {courses.map((course, idx) => {
        return (
            <tr key={idx}>
                <td>{course.courseName}</td>
                {withExpiry ? (
                <>
                    <td>{course.expiryDate || '-'}</td>
                    <td>
                    {getRemainingDaysBadge(course.expiryDate)}
                    </td>
                </>
                ) : (
                <td>{course.date || 'N/A'}</td>
                )}
            </tr>
            );
      })}
      </tbody>
    </Table>
  );

  

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (isError) {
    return <Alert variant="danger">Error: {error.message}</Alert>;
  }

  const data = queryData?.data || [];

  return (
    <div className="scrollableContainer">
       
       <Row xs={1} md={2} lg={3}>
       {data.map((item, index) => {
                    const coursesWithExpiry = item.CoursesAndCertificates.filter(course => course.expiryDate);
                    const coursesWithoutExpiry = item.CoursesAndCertificates.filter(course => !course.expiryDate);

        return (
          <Col key={index} className="mb-4">
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
                    {renderCoursesTable(coursesWithExpiry, true)}
                  </>
                )}
                {coursesWithoutExpiry.length > 0 && (
                  <>
                    <h5>Courses without Expiry</h5>
                    {renderCoursesTable(coursesWithoutExpiry)}
                  </>
                )}
                </Carousel>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
    <div className="pagination">
        <Button style={{ backgroundColor: '#242D42', color: '#F7F4F3', border:'none' }} onClick={handlePrevious} disabled={page === 1}>Previous</Button>
        <span>Page {page}</span>
        <Button style={{ backgroundColor: '#242D42', color: '#F7F4F3', border:'none' }} onClick={handleNext}>Next</Button>
    </div>
    </div>
  );
}

export default Retmetauser;
