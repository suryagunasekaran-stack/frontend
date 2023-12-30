import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/HomePage.css'; 
import 'react-calendar/dist/Calendar.css';
import FeedDisplay from './viewFeed';
import Calendar from 'react-calendar';

const HomePage = () => {
  return (
    <Container fluid className='HomeContainer'>
    <Row>
      <Col>
        <div className="header">
            <h1>BrightSafety</h1>
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

      <Row className="first-row text-center justify-content-start">
        <Col>
            <div className="feed-display-container justify-content-start">
              <FeedDisplay/>
            </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
