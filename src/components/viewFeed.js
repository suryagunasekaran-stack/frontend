import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

const FeedDisplay = () => {
    const [feedItems, setFeedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/getFeedItems')
            .then(response => response.json())
            .then(data => {
                setFeedItems(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching feed items:', error);
                setIsLoading(false);
            });
    }, []);

    const convertToImageUrl = (binaryData) => {
        if (!binaryData) {
            return ''; // Return a default image or an empty string if binaryData is undefined or null
        }
    
        try {
            // Convert binary data (array of byte values) to a binary string
            const binaryString = binaryData.data.reduce((str, byte) => str + String.fromCharCode(byte), '');
    
            // Convert binary string to base64
            const base64String = btoa(binaryString);
    
            // Construct the data URL
            return `data:${binaryData.contentType};base64,${base64String}`;
        } catch (error) {
            console.error('Error converting image:', error);
            return ''; // Return a default image or an empty string in case of an error
        }
    };
    

    if (isLoading) {
        return (
            <Container className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container>
            <Row xs={1} md={2} lg={3} className="g-4">
                {feedItems.map((item) => (
                    <Col key={item._id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.message}</Card.Text>
                                {item.pictures && item.pictures.map((pic, picIndex) => (
    pic.data ? <Card.Img key={picIndex} variant="top" src={convertToImageUrl(pic.data)} alt={`Feed item ${item._id}`} /> : null
))}
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Posted on {new Date(item.createdAt).toLocaleDateString()}</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FeedDisplay;
