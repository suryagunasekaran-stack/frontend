import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Card, Container, Row, Col, Alert, Image, Button, Form, Table, InputGroup } from 'react-bootstrap';

const apiUrl = process.env.REACT_APP_API_URL;

async function fetchUsers() {
  const response = await fetch(`${apiUrl}/getallusers`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function updateUser(userData) {
  const response = await fetch(`${apiUrl}/updateUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

function Users() {
  const queryClient = useQueryClient();
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    };

  const { data: users, isLoading, isError, error } = useQuery('users', fetchUsers);

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      setEditingUserId(null); // Reset editing state
    },
  });

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setEditFormData(user);
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  const handleFormChange = (event) => {
    setEditFormData({ ...editFormData, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    updateUserMutation.mutate({ ...editFormData });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Alert variant="danger">Error: {error.message}</Alert>;

  return (
    <Container>
      <Row>
        {users.map(user => (
          <Col key={user._id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                {editingUserId === user._id ? (
                  // Edit Form
                  <Form>
                    <Image src={editFormData.profileImage} roundedCircle fluid className="mb-3" />
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={editFormData.firstName}
                        onChange={handleFormChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={editFormData.lastName}
                        onChange={handleFormChange}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleFormChange}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                        type="text"
                        name="department"
                        value={editFormData.department}
                        onChange={handleFormChange}
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <Form.Control
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        value={editFormData.password}
                        onChange={handleFormChange}
                        />
                        <InputGroup.Text onClick={togglePasswordVisibility}>
                        {passwordVisible ? '👁️' : '👁️‍🗨️'}
                        </InputGroup.Text>
                    </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                        type="text"
                        name="role"
                        value={editFormData.role}
                        onChange={handleFormChange}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={editFormData.phoneNumber}
                        onChange={handleFormChange}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={editFormData.username}
                        onChange={handleFormChange}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Profile Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="profileImage"
                        value={editFormData.profileImage}
                        onChange={handleFormChange}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Check 
                        type="checkbox"
                        name="isActive"
                        label="Active User"
                        checked={editFormData.isActive}
                        onChange={e => setEditFormData({ ...editFormData, isActive: e.target.checked })}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Language Preference</Form.Label>
                    <Form.Control
                        type="text"
                        name="languagePreference"
                        value={editFormData.languagePreference}
                        onChange={handleFormChange}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        name="country"
                        value={editFormData.location?.country}
                        onChange={handleFormChange}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type="text"
                        name="state"
                        value={editFormData.location?.state}
                        onChange={handleFormChange}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        name="city"
                        value={editFormData.location?.city}
                        onChange={handleFormChange}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Time Zone</Form.Label>
                    <Form.Control
                        type="text"
                        name="timeZone"
                        value={editFormData.location?.timeZone}
                        onChange={handleFormChange}
                    />
                    </Form.Group>
                    {/* Add other fields similar to the above */}
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                  </Form>
                ) : (
                  // Display Card
                  <>
                    <Image src={user.profileImage} fluid className="mb-3" />
                    <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                    <Card.Text as="div">
                    <Table borderless size="sm">
                        <tbody>
                        <tr>
                            <td>Email:</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Department:</td>
                            <td>{user.department}</td>
                        </tr>
                        <tr>
                            <td>First Name:</td>
                            <td>{user.firstName}</td>
                        </tr>
                        <tr>
                            <td>Last Name:</td>
                            <td>{user.lastName}</td>
                        </tr>
                        <tr>
                            <td>Phone Number:</td>
                            <td>{user.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td>Username:</td>
                            <td>{user.username}</td>
                        </tr>
                        <tr>
                        <td>Password:</td>
                        <td>
                            {passwordVisible ? user.password : '••••••••'}
                            <Button variant="link" onClick={togglePasswordVisibility}>
                            {passwordVisible ? 'Hide' : 'Show'}
                            </Button>
                        </td>
                        </tr>
                        </tbody>
                    </Table>
                    <hr />
                    <Table borderless size="sm">
                        <tbody>
                        <tr>
                            <td>Active:</td>
                            <td>{user.isActive ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <td>Language Preference:</td>
                            <td>{user.languagePreference}</td>
                        </tr>
                        <tr>
                            <td>Role:</td>
                            <td>{user.role}</td>
                        </tr>
                        <tr>
                            <td>Location:</td>
                            <td>{`${user.location?.country}, ${user.location?.state}, ${user.location?.city}`}</td>
                        </tr>
                        <tr>
                            <td>Time Zone:</td>
                            <td>{user.location?.timeZone}</td>
                        </tr>
                        </tbody>
                    </Table>
                    </Card.Text>

                    <Button variant="primary" onClick={() => handleEdit(user)}>Edit</Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Users;
