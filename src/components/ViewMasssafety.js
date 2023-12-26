import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error}</p>;
    return (
<Container>
    <h2 className="text-center">All Records</h2>
    <Row>
        {records.map(record => (
            <Col sm={12} md={6} lg={4} className="mb-4" key={record._id}>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title text-center">
                            Mass Safety Briefing
                        </h4>
                        {/* <Row className="card-text"><Col xs={6} className="text-left">Document ID:</Col> <Col xs={6} className="text-left">{record._id}</Col></Row> */}
                        <Row className="card-text"><Col xs={6} className="text-left">Trade:</Col> <Col xs={6} className="text-left">{record.trade}</Col></Row>
                        <Row className="card-text"><Col xs={6} className="text-left">Date & Time:</Col> <Col xs={6} className="text-left">{new Date(record.date).toLocaleString()}</Col></Row>
                        <Row className="card-text"><Col xs={6} className="text-left">Topic:</Col> <Col xs={6} className="text-left">{record.topic}</Col></Row>
                        <Row className="card-text"><Col xs={6} className="text-left">Location:</Col> <Col xs={6} className="text-left">{record.location}</Col></Row>

                        <Col className="d-flex justify-content-end" style={{ paddingTop: '10px' }} >
                            <PdfSafety {...record} />
                        </Col>
                    </div>
                </div>
            </Col> 
        ))}
    </Row>
</Container>


    );
};

export default MassViewer;
