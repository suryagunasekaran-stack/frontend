import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import PdfSafety from './PdfSafety';


const MassViewer = () => {
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token'); // Retrieve the stored token from localStorage

    const fetchData = async () => {
        try {
            const authorUsername = localStorage.getItem('username'); // Get the author's username from localStorage
            const response = await fetch('http://localhost:3000/getmasssafetyrecords', { // Update with your server URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ author: authorUsername }) // Send the author's username in the request body
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setRecords(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
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
            body: JSON.stringify({ id: recordId, status: updatedStatus, modelName: "MassSafety" })
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
                                <Row className="card-text"><Col xs={6} className="text-left">Department:</Col> <Col xs={6} className="text-left">{record.trade}</Col></Row>
                                <Row className="card-text"><Col xs={6} className="text-left">Date & Time:</Col> <Col xs={6} className="text-left">{new Date(record.date).toLocaleString()}</Col></Row>
                                <Row className="card-text"><Col xs={6} className="text-left">Topic:</Col> <Col xs={6} className="text-left">{record.topic}</Col></Row>
                                <Row className="card-text"><Col xs={6} className="text-left">Location:</Col> <Col xs={6} className="text-left">{record.location}</Col></Row>

                                <Row className="mt-3">
                                    {record.status === 'approved' || record.status === 'rejected' ? (
                                        <Col xs={4} className="d-flex align-items-center justify-content-start">
                                            <Badge pill bg={record.status === 'approved' ? 'success' : 'danger'} text="light">
                                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                            </Badge>
                                        </Col>
                                    ) : <Col xs={4} className="d-flex align-items-center justify-content-start">
                                            <Badge pill bg='warning' text="light">
                                                Pending
                                            </Badge>
                                        </Col>}
                                    
                                    {localStorage.getItem('role') === 'supervisor' && record.status === 'pending' && (
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
                                        <PdfSafety className="w-100" {...record} />
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

export default MassViewer;
