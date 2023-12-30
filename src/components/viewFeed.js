import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';

const FeedDisplay = () => {
    const [feedItems, setFeedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Replace 'token' with the actual key you're using
    
        fetch('http://localhost:3000/getFeedItems', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
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
    
    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        if (window.confirm("Are you sure you want to delete this feed item?")) {
            fetch('http://localhost:3000/deleteFeedItem', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ id }), // Send the ID in the body
                // Include authentication token if your API requires
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Update the feedItems state to remove the deleted item
                setFeedItems(feedItems.filter(item => item._id !== id));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
                    <Col key={item._id} >
                        <Card className="h-100">
                            <Row noGutters>
                                <Col md={6} className="p-0">
                                    {item.pictures && item.pictures.map((pic, picIndex) => (
                                        pic.data ? <Card.Img key={picIndex} className="full-width-image" src={convertToImageUrl(pic.data)} alt={`Feed item ${item._id}`} /> : null
                                    ))}
                                </Col>
                                <Col md={6}>
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>{item.message}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="small-footer">
                                        <small className="text-muted">Posted on {new Date(item.createdAt).toLocaleDateString()}</small>
                                    </Card.Footer>
                                </Col>
                            </Row>
                            {localStorage.getItem("role") === "supervisor" && (
                                <Button 
                                    variant="danger" 
                                    style={{ position: 'absolute', top: '10px', right: '10px' }}
                                    onClick={() => handleDelete(item._id)}
                                >
                                    X
                                </Button>
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FeedDisplay;
