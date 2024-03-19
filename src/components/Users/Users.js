import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Card, Container, Row, Col, Alert, Button, Form, Table, InputGroup, Modal } from 'react-bootstrap';
import '../../css/User.css'

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

async function addUser(userData) {
    const response = await fetch(`${apiUrl}/addUser`, {
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
  
  async function deleteUser(userId) {
    const response = await fetch(`${apiUrl}/deleteUser/${userId}`, {
      method: 'DELETE'
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
  const [newUserFormData, setNewUserFormData] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddModalClose = () => setShowAddModal(false);
  const handleAddModalShow = () => setShowAddModal(true);

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

  const addUserMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
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

  const handleNewUserFormChange = (event) => {
    setNewUserFormData({ ...newUserFormData, [event.target.name]: event.target.value });
  };

  const handleAddUser = () => {
    addUserMutation.mutate({ ...newUserFormData });
    setNewUserFormData({}); // Reset the form
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  const handleSave = () => {
    updateUserMutation.mutate({ ...editFormData });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Alert variant="danger">Error: {error.message}</Alert>;

  return (
    <Container>

      <Button variant="primary" onClick={handleAddModalShow} className="mb-3">
        Add User
      </Button>

      <Modal show={showAddModal} onHide={handleAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
            <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={newUserFormData.username || ''}
            onChange={handleNewUserFormChange}
            required
            />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={newUserFormData.password || ''}
            onChange={handleNewUserFormChange}
            required
            />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
            type="text"
            placeholder="Role"
            name="role"
            value={newUserFormData.role || ''}
            onChange={handleNewUserFormChange}
            required
            />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Control
            type="text"
            placeholder="Department"
            name="department"
            value={newUserFormData.department || ''}
            onChange={handleNewUserFormChange}
            required
            />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Employee Number</Form.Label>
            <Form.Control
            type="text"
            placeholder="Employee Number"
            name="employeeNumber"
            value={newUserFormData.employeeNumber || ''}
            onChange={handleNewUserFormChange}
            required
            />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
            type="text"
            placeholder="First Name"
            name="firstName"
            value={newUserFormData.firstName || ''}
            onChange={handleNewUserFormChange}
            required
            />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={newUserFormData.lastName || ''}
            onChange={handleNewUserFormChange}
            required
            />
        </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            handleAddUser();
            handleAddModalClose();
          }}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        {users.map(user => (
          <Col key={user._id} md={3} className="mb-3">
            <Card>
              <Card.Body>
                {editingUserId === user._id ? (
                  // Edit Form
                  <Form>
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
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={editFormData.username}
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
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                        type="text"
                        name="department"
                        value={editFormData.department}
                        onChange={handleFormChange}
                    />
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
                    <Form.Label>Employee Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="employeeNumber"
                        value={editFormData.employeeNumber}
                        onChange={handleFormChange}
                    />
                    </Form.Group>

                    <Button variant="primary" onClick={handleSave}>Save</Button>
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                  </Form>
                ) : (
                  // Display Card
                  <>
                    {/* <Image src={user.profileImage} fluid className="mb-3" /> */}
                    <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                    <Card.Text as="div">
                    <Table borderless size="sm">
                        <tbody>
                        <tr>
                            <td>Username:</td>
                            <td>{user.username}</td>
                        </tr>
                            <td>Password:</td>
                            <td>
                                {passwordVisible ? user.password : '••••••••'}
                                <Button variant="link" onClick={togglePasswordVisibility}>
                                {passwordVisible ? 'Hide' : 'Show'}
                                </Button>
                            </td>
                        <tr>
                            <td>Department:</td>
                            <td>{user.department}</td>
                        </tr>
                        <tr>
                            <td>Employee Number:</td>
                            <td>{user.employeeNumber}</td>
                        </tr>
                        <tr>

                        </tr>
                        </tbody>
                    </Table>
                    <hr />
                    <Table borderless size="sm">
                        <tbody>
                        <tr>
                            <td>Role:</td>
                            <td>{user.role}</td>
                        </tr>
                        </tbody>
                    </Table>
                    </Card.Text>

                    <Row className="mt-auto">
                    <Col className="d-flex justify-content-start">
                    <Button variant="primary" onClick={() => handleEdit(user)}>Edit</Button>
                    </Col>
                    <Col className="d-flex justify-content-end">
                    <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                    </Col>
                </Row>
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
