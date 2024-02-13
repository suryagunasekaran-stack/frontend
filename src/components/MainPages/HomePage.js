import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../css/HomePage.css'; 
import 'react-calendar/dist/Calendar.css';
import FeedDisplay from '../Views/viewFeed';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom




const HomePage = () => {
  const navigate = useNavigate();

const handleRedirect = () => {
  navigate('/CreateFeedItem');
};
  return (
    <Container fluid className='HomeContainer'>
    <Row>
      <Col>
        <div className="header">
            <h1>BrightSafe</h1>
        </div>
      </Col>
    </Row>

    <Row>
      <Col>
        <div style={{paddingLeft:"20px", paddingTop:"20px"}}>
            <h2>Safety Posts:</h2>
        </div>
      </Col>
    </Row>

    <Row>
      <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div >
           {localStorage.getItem("role") === "supervisor" ? <Button onClick={handleRedirect}>Create New Post</Button>  : "" } 
        </div>
      </Col>
    </Row>

    <FeedDisplay/>
    </Container>
  );
};

export default HomePage;
