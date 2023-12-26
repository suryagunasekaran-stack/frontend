import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import PdfGenerator from './Pdfgenarator'
import '../css/Viewer.css'


const RecordsViewer = () => {
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // eslint-disable-next-line
    const [role, setRole] = useState(null); // Add this line

    const fetchDataBasedOnRole = async () => {
        try {
            const username = localStorage.getItem('username'); // Get the username from localStorage
            const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    
            // Fetch user role
            const roleResponse = await fetch('http://localhost:3000/getuserrole', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ username })
            });
    
            if (!roleResponse.ok) {
                throw new Error(`HTTP error when fetching role! Status: ${roleResponse.status}`);
            }
    
            const roleData = await roleResponse.json();
            setRole(roleData.role); // Assuming the response has a 'role' field
    
            // Decide which endpoint to call based on the role
            const endpoint = roleData.role === 'supervisor'
                ? 'http://localhost:3000/gettoolboxrecords'
                : 'http://localhost:3000/gettoolboxrecordsbyauthor';
    
            // Fetch data from the chosen endpoint
            const dataResponse = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ author: username }) // This can be adjusted based on what each endpoint expects
            });
    
            if (!dataResponse.ok) {
                throw new Error(`HTTP error when fetching data! Status: ${dataResponse.status}`);
            }
    
            const data = await dataResponse.json();
            setRecords(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchDataBasedOnRole();
        // eslint-disable-next-line
    }, []);

    const handleApprove = async (recordId, updatedStatus) => {
        const token = localStorage.getItem('token'); // Get the username from localStorage
        // Call to backend to update status
        const response = await fetch('http://localhost:3000/updateRecordStatus', {
            method: 'PUT', // or 'PATCH'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include your auth token if needed
            },
            body: JSON.stringify({ id: recordId, status: updatedStatus })
        });
    
        if (response.ok) {
            // Update local state to reflect the change
            setRecords(records.map(rec => rec._id === recordId ? { ...rec, status: updatedStatus } : rec));
        } else {
            // Handle error
            console.error('Failed to update record status');
        }
    }; 
    

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error}</p>;
    return (
        <Container>
        <h2 className="text-center">All Records</h2>
        <Row>
            {records.map(record => {
                // Determine the gradient class based on the record status
                let gradientClass = '';
                switch (record.status) {
                    case 'pending':
                        gradientClass = 'gradient-pending';
                        break;
                    case 'rejected':
                        gradientClass = 'gradient-rejected';
                        break;
                    case 'approved':
                        gradientClass = 'gradient-approved';
                        break;
                    default:
                        // Default class if needed
                        break;
                }

                return (
                    <Col sm={12} md={6} lg={4} className="mb-4" key={record._id}>
                        <div className={`card ${gradientClass}`}>
                            <div className="card-body">
                                <h4 className="card-title text-center">
                                    {record.type === 'dailymeeting' && 'DAILY TOOLBOX MEETING AND PPE RECORD'}
                                    {record.type === 'contractorsmeeting' && 'CONTRACTORS TOOLBOX MEETING AND PPE RECORD'}
                                    {record.type === 'transportmeeting' && 'TRANSPORT MEETING RECORD'}
                                </h4>
                                <Row className="card-text"><Col xs={6} className="text-left">Department:</Col> <Col xs={6} className="text-left">{record.department}</Col></Row>
                                <Row className="card-text"><Col xs={6} className="text-left">Date & Time:</Col> <Col xs={6} className="text-left">{new Date(record.dateTime).toLocaleString()}</Col></Row>
                                <Row className="card-text"><Col xs={6} className="text-left">Author:</Col> <Col xs={6} className="text-left">{record.author}</Col></Row>
                                <Row className="card-text"><Col xs={6} className="text-left">RA Number:</Col> <Col xs={6} className="text-left">{record.raNumber}</Col></Row>
                                <Row className="card-text"><Col xs={6} className="text-left">Vessel:</Col> <Col xs={6} className="text-left">{record.vessel}</Col></Row>
                                <Row className="card-text"><Col xs={6} className="text-left">Topic:</Col> <Col xs={6} className="text-left">{record.topic}</Col></Row>

                                <Row className="mt-3">
                                    {record.status === 'approved' || record.status === 'rejected' ? (
                                        <Col xs={4} className="d-flex align-items-center justify-content-start">
                                            <Badge pill bg={record.status === 'approved' ? 'success' : 'danger'} text="dark">
                                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                            </Badge>
                                        </Col>
                                    ) : null}
                                    
                                    {role === 'supervisor' && record.status === 'pending' && (
                                        <>
                                            <Col xs={4} className="d-flex align-items-center justify-content-center">
                                                <Button variant="success" onClick={() => handleApprove(record._id, "approved")}>Approve</Button>
                                            </Col>
                                            <Col xs={4} className="d-flex align-items-center justify-content-center">
                                                <Button variant="danger" onClick={() => handleApprove(record._id, "rejected")}>Reject</Button>
                                            </Col>
                                        </>
                                    )}

                                    <Col>
                                        <PdfGenerator className="w-100" {...record} />
                                    </Col>
                                </Row>

                            </div>
                        </div>
                    </Col>
                );
            })}
        </Row>
    </Container>


    );
};

export default RecordsViewer;
