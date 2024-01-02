import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'
import background from '../media/loginBackground.svg';

const LoginPage = () => {

// eslint-disable-next-line
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const apiUrl = process.env.REACT_APP_API_URL;


const handleUsernameChange = (e) => {
    setUsername(e.target.value);
};

const handlePasswordChange = (e) => {
    setPassword(e.target.value);
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include', // Include credentials to handle cookies
        });

        const data = await response.json();
        if (data.message === "Login successful") {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username)
            localStorage.setItem('role', data.role)
          navigate('/HomePage');
        }

    } catch (error) {
        console.error('Error:', error); // Handle errors here
    }
};

    
      return (
        <div className='loginPageContainer'>
        <Container fluid className="d-flex justify-content-center align-items-center" id='loginForm' style={{ minHeight: "100vh", position: "relative" }}>
            <img src={background} alt="Background" className='loginBackgroundImage' />            
          <Row >
              <Col xs={12} md={12} lg={12} xl={12} className="mx-auto" >
                <Card className='loginCard'>
                    <Card.Body>
                    <Card.Title style={{paddingBottom:"30px", fontSize:"1.5em"}}>Brightsun Engineering Safety</Card.Title>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Username</Form.Label>
                          <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                      </Form.Group>

                      <Button style={{ backgroundColor: '#383631', borderColor: '#383631', display: "flex", position: "left:0" }} type="submit">
                          Login
                      </Button>
                  </Form>
                    </Card.Body>
                </Card>
              </Col>
          </Row>
        </Container>
        </div>
      );
  };

export default LoginPage;
