import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaEdit } from 'react-icons/fa'; // Make sure react-icons is installed

const UserCard = ({ user, onSave }) => {
    const [isEditingFields, setIsEditingFields] = useState(false);
    const [isEditingImage, setIsEditingImage] = useState(false);
    const [editableUser, setEditableUser] = useState({ ...user });
    const [imageFile, setImageFile] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleEditFields = () => setIsEditingFields(true);
    const handleEditImage = () => setIsEditingImage(true);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSave = async () => {
        // Handle image upload logic
        // ...

        onSave(editableUser);
        setIsEditingFields(false);
        setIsEditingImage(false);
        setImageFile(null);
    };

    const handleDiscard = () => {
        setEditableUser({ ...user });
        setIsEditingFields(false);
        setIsEditingImage(false);
        setImageFile(null);
    };

    const handleChange = (e) => {
        setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
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
            <div style={{ position: 'relative' }}>
                <Card.Img variant="top" src={editableUser.profileImage || 'https://via.placeholder.com/150'} alt={`${editableUser.firstName} ${editableUser.lastName}`} />
                {!isEditingImage && (
                    <Button variant="light" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={handleEditImage}>
                        <FaEdit />
                    </Button>
                )}
            </div>
            <Card.Body>
                <ListGroup className="list-group-flush">
                    {isEditingImage ? (
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />
                        </Form.Group>
                    ) : (
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item style={fieldGroupStyle}>
                                <div style={fieldStyle}>
                                    <div style={fieldTitleStyle}><strong>Name:</strong></div>
                                    {isEditingFields ? (
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={editableUser.firstName}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <div style={fieldValueStyle}>{user.firstName} {user.lastName}</div>
                                    )}
                                </div>
                                <div style={fieldStyle}>
                                    <div style={fieldTitleStyle}><strong>Username:</strong></div>
                                    {isEditingFields ? (
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            value={editableUser.username}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <div style={fieldValueStyle}>{user.username}</div>
                                    )}
                                </div>
                            </ListGroup.Item>
                            
                            <ListGroup.Item style={fieldGroupStyle}>
                            {/* Password Field */}
                            <div style={fieldStyle}>
                                <div style={fieldTitleStyle}><strong>Password:</strong></div>
                                {isEditingFields ? (
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={editableUser.password}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <div style={fieldValueStyle}>
                                        {showPassword ? editableUser.password : '••••••••'}
                                        <Button variant="link" onClick={togglePasswordVisibility} style={{ marginLeft: '10px' }}>
                                            {showPassword ? 'Hide' : 'Show'}
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Email Field */}
                            <div style={fieldStyle}>
                                <div style={fieldTitleStyle}><strong>Email:</strong></div>
                                {isEditingFields ? (
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={editableUser.email}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <div style={fieldValueStyle}>{editableUser.email}</div>
                                )}
                            </div>
                        </ListGroup.Item>

                        <ListGroup.Item style={fieldGroupStyle}>
                            {/* Phone Field */}
                            <div style={fieldStyle}>
                                <div style={fieldTitleStyle}><strong>Phone:</strong></div>
                                {isEditingFields ? (
                                    <Form.Control
                                        type="tel"
                                        name="phoneNumber"
                                        value={editableUser.phoneNumber}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <div style={fieldValueStyle}>{editableUser.phoneNumber}</div>
                                )}
                            </div>

                            {/* Role Field */}
                            <div style={fieldStyle}>
                                <div style={fieldTitleStyle}><strong>Role:</strong></div>
                                {isEditingFields ? (
                                    <Form.Control
                                        type="text"
                                        name="role"
                                        value={editableUser.role}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <div style={fieldValueStyle}>{editableUser.role}</div>
                                )}
                            </div>
                        </ListGroup.Item>

                        <ListGroup.Item style={fieldStyle}>
                            {/* Department Field */}
                            <div style={fieldStyle}>
                                <div style={fieldTitleStyle}><strong>Department:</strong></div>
                                {isEditingFields ? (
                                    <Form.Control
                                        type="text"
                                        name="department"
                                        value={editableUser.department}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <div style={fieldValueStyle}>{editableUser.department}</div>
                                )}
                            </div>
                        </ListGroup.Item>

                        <ListGroup.Item style={fieldStyle}>
                            {/* Location Field */}
                            <div style={fieldStyle}>
                                <div style={fieldTitleStyle}><strong>Location:</strong></div>
                                {isEditingFields ? (
                                    // Assuming location is a simple string for edit, adjust if it's an object
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        value={`${editableUser.location.city}, ${editableUser.location.state}, ${editableUser.location.country}`}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <div style={fieldValueStyle}>{`${editableUser.location.city}, ${editableUser.location.state}, ${editableUser.location.country}`}</div>
                                )}
                            </div>
                        </ListGroup.Item>

                        </ListGroup>
                    )}
                </ListGroup>
                {isEditingFields || isEditingImage ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="primary" onClick={handleSave} style={{ marginRight: '10px' }}>Save</Button>
                        <Button variant="secondary" onClick={handleDiscard}>Discard</Button>
                    </div>
                ) : (
                    <Button variant="warning" onClick={handleEditFields}>Edit Details</Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default UserCard;
