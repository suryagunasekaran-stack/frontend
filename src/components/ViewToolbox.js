import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import PdfGenerator from './Pdfgenarator'
import '../css/Viewer.css'


const RecordsViewer = () => {
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token'); // Retrieve the stored token from localStorage

    const fetchData = async () => {
        try {
            const authorUsername = localStorage.getItem('username'); // Get the author's username from localStorage
            const response = await fetch('http://localhost:3000/gettoolboxrecordsbyauthor', { // Update with your server URL
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

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error}</p>;
    console.log(records);
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
                                <Col xs={6} className="d-flex align-items-center justify-content-start">
                                    <Badge pill bg="warning" text="dark">Pending</Badge>
                                </Col>

                                    <Col xs={6} className="d-flex justify-content-end">
                                        <PdfGenerator {...record} />
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
