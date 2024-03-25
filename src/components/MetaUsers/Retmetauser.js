import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import React from 'react';
import { Card, Table, Row, Col, Spinner, Alert } from 'react-bootstrap';
import '../../css/Metafileuser.css'

async function fetchmetadata() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/getMetaData`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
}

function Retmetauser() {
  const { data, isLoading, isError, error } = useQuery('fileData', fetchmetadata);

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
        const isExpired = withExpiry && dayjs().isAfter(dayjs(course.expiryDate, 'DD/MM/YYYY'));
        return (
          <tr key={idx}>
            <td>{course.courseName}</td>
            {withExpiry ? (
              <>
                <td>{course.expiryDate || '-'}</td>
                <td style={{ color: isExpired ? 'red' : 'green' }}>
                  {isExpired ? 'Expired' : 'Valid'}
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
                <div className="metaFileUsersCardContent">
                <Card.Img 
                    variant="top" 
                    src={item.profileImg || 'https://ui-avatars.com/api/?name=Unknown&color=7F9CF5&background=EBF4FF'} 
                    className="card-img"
                />
                <Card.Title className="card-title"> {item.NAME}</Card.Title>
                </div>
                <Table className='metafilecustomtable'>
                    <tbody>
                    <tr>
                    <td>Employee Number:</td>
                    <td>{item['EMP NO.']}</td>
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

                <Table metafilecustomtable borderless size="sm">
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
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
    </div>
  );
}

export default Retmetauser;
