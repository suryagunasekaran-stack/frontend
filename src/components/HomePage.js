import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/HomePage.css'; 
import 'react-calendar/dist/Calendar.css';
import FeedDisplay from './viewFeed';

const HomePage = () => {
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

    <FeedDisplay/>
    </Container>
  );
};

export default HomePage;
