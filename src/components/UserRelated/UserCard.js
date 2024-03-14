import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const UserCard = ({ user }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const fieldGroupStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    };

    const fieldStyle = {
        flexBasis: '45%',
        marginBottom: '1rem',
    };

    const fieldValueStyle = {
        paddingBottom: '0.5rem'
    };

    const fieldTitleStyle = {
        textTransform: 'uppercase',
        fontFamily: 'Arial, sans-serif',
    };

    return (
        <Card style={{ width: '100%', marginBottom: '1rem', maxWidth: '600px' }}>
            <Card.Img variant="top" src={'https://via.placeholder.com/150'} alt={`${user.firstName} ${user.lastName}`} />
            <Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item style={fieldGroupStyle}>
                        <div style={fieldStyle}>
                            <div style={fieldTitleStyle}><strong>Name:</strong></div>
                            <div style={fieldValueStyle}>{user.firstName} {user.lastName}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={fieldTitleStyle}><strong>Username:</strong></div>
                            <div style={fieldValueStyle}>{user.username}</div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item style={fieldGroupStyle}>
                        <div style={fieldStyle}>
                            <div style={fieldTitleStyle}><strong>Password:</strong></div>
                            <div style={fieldValueStyle}>
                                {showPassword ? user.password : '••••••••'}
                                <Button variant="link" onClick={togglePasswordVisibility} style={{ marginLeft: '10px' }}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </Button>
                            </div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={fieldTitleStyle}><strong>Email:</strong></div>
                            <div style={fieldValueStyle}>{user.email}</div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item style={fieldGroupStyle}>
                        <div style={fieldStyle}>
                            <div style={fieldTitleStyle}><strong>Phone:</strong></div>
                            <div style={fieldValueStyle}>{user.phoneNumber}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={fieldTitleStyle}><strong>Role:</strong></div>
                            <div style={fieldValueStyle}>{user.role}</div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item style={fieldStyle}>
                        <div style={fieldTitleStyle}><strong>Department:</strong></div>
                        <div style={fieldValueStyle}>{user.department}</div>
                    </ListGroup.Item>
                    <ListGroup.Item style={fieldStyle}>
                        <div style={fieldTitleStyle}><strong>Location:</strong></div>
                        <div style={fieldValueStyle}>{`${user.location.city}, ${user.location.state}, ${user.location.country}`}</div>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default UserCard;
