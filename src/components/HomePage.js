
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/HomePage.css';
import FeedDisplay from './viewFeed';

const HomePage = () => {
const username = localStorage.getItem('username');

  const Dashboard = () => (
    <div>
        {/* Dashboard content goes here */}
        <h1>Welcome {username}</h1>
        <h2>Daily Safety Update</h2>
    </div>
);



return (
  <Container fluid className='homepage'>
      <Row className='homepagerow'>
          <Col className='d-flex justify-content-left align-items-left p-3' >
              <Dashboard />
          </Col>
      </Row>
      <Row>
        <Col>
            <FeedDisplay />
        </Col>
      </Row>
  </Container>
);
};

export default HomePage;
