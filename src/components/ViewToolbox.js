import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PdfGenerator from './Pdfgenarator'
import '../css/Viewer.css'


const RecordsViewer = () => {
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  const navigateToToolboxCreate = () => {
    navigate('/ToolboxCreate');
  };

    const fetchDataBasedOnRole = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the stored token from localStorage
            const role = localStorage.getItem('role'); // Retrieve the stored role from localStorage
            if (role !== 'supervisor') {
                // For non-supervisor roles, add the author's username to the request body
                var authorUsername = localStorage.getItem('username'); // Get the author's username from localStorage
            }

            // Fetch data from the chosen endpoint
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/gettoolboxrecords`, { // Update with your server URL
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
        }catch (error) {
            setError(error.message);
        }finally {
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
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/updateRecordStatus`, {
            method: 'PUT', // or 'PATCH'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include your auth token if needed
            },
            body: JSON.stringify({ id: recordId, status: updatedStatus, modelName: "MainData" })
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
        <Container style={{ minHeight: '100vw', minWidth: '100vw', backgroundColor: '#E5ECF4' }}>
        <div className="d-flex justify-content-between align-items-center p-3" style={{ paddingTop: "25px", paddingBottom: "25px" }}>
            <h2 className="text-left" style={{ marginLeft: "100px" }}>ToolBox Meeting Records</h2>
            <Button style={{ backgroundColor: '#383631', borderColor: '#383631' }} onClick={navigateToToolboxCreate}>
            Create Record
            </Button>
        </div>
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
                        <div className={`card ${gradientClass}`} >
                            <div className="card-body">
                                <h4 className="card-title text-center">
                                    {record.type === 'dailymeeting' && 'DAILY TOOLBOX MEETING AND PPE RECORD'}
                                    {record.type === 'contractorsmeeting' && 'CONTRACTORS TOOLBOX MEETING AND PPE RECORD'}
                                    {record.type === 'transportmeeting' && 'TRANSPORT MEETING RECORD'}
                                </h4>
                                <Row style={{fontFamily: "'Teko', sans-serif", fontSize:"30px"}} className="card-text"><Col xs={6} className="text-left">Department:</Col> <Col xs={6} className="text-left">{record.department}</Col></Row>
                                <Row style={{fontFamily: "'Teko', sans-serif", fontSize:"30px"}} className="card-text"><Col xs={6} className="text-left">Date & Time:</Col> <Col xs={6} className="text-left">{new Date(record.dateTime).toLocaleString()}</Col></Row>
                                <Row style={{fontFamily: "'Teko', sans-serif", fontSize:"30px"}} className="card-text"><Col xs={6} className="text-left">Author:</Col> <Col xs={6} className="text-left">{record.author}</Col></Row>
                                <Row style={{fontFamily: "'Teko', sans-serif", fontSize:"30px"}} className="card-text"><Col xs={6} className="text-left">RA Number:</Col> <Col xs={6} className="text-left">{record.raNumber}</Col></Row>
                                <Row style={{fontFamily: "'Teko', sans-serif", fontSize:"30px"}} className="card-text"><Col xs={6} className="text-left">Vessel:</Col> <Col xs={6} className="text-left">{record.vessel}</Col></Row>
                                <Row style={{fontFamily: "'Teko', sans-serif", fontSize:"30px"}} className="card-text"><Col xs={6} className="text-left">Topic:</Col> <Col xs={6} className="text-left">{record.topic}</Col></Row>

                                <Row className="mt-3">
                                    {record.status === 'approved' || record.status === 'rejected' ? (
                                        <Col xs={4} className="d-flex align-items-center justify-content-start">
                                            <Badge style={{ padding: '0.5em 1em',  fontSize: '1em' }} bg={record.status === 'approved' ? 'success' : 'danger'} text="light">
                                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                            </Badge>
                                        </Col>
                                    ) : <Col  xs={4}  className="d-flex align-items-center justify-content-start">
                                            <Badge style={{ padding: '0.5em 1em',  fontSize: '1em' }} bg='warning' text="light">
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
                                    <div className="d-flex justify-content-end">
                                        <PdfGenerator className="w-100" {...record} />
                                    </div>
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
