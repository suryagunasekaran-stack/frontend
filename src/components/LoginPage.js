import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

const handleUsernameChange = (e) => {
    setUsername(e.target.value);
};

const handlePasswordChange = (e) => {
    setPassword(e.target.value);
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/login', {
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
          navigate('/HomePage');
        }

    } catch (error) {
        console.error('Error:', error); // Handle errors here
    }
};

    
      return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <Row >
              <Col xs={12} md={12} lg={12} xl={12} className="mx-auto" >
                <Card>
                    <Card.Body>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Username</Form.Label>
                          <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                      </Form.Group>

                      <Button variant="primary" type="submit">
                          Login
                      </Button>
                  </Form>
                    </Card.Body>
                </Card>
              </Col>
          </Row>
        </Container>
      );
  };

export default LoginPage;
