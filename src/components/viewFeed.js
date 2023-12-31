import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';

const FeedDisplay = () => {
    const [feedItems, setFeedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const token = localStorage.getItem('token'); // Replace 'token' with the actual key you're using
    
        fetch(`${apiUrl}/getFeedItems`, {
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
        // eslint-disable-next-line
    }, []);
    

    const convertToImageUrl = (binaryData) => {
        if (!binaryData || !binaryData.data || !binaryData.contentType) {
            console.error('Invalid binary data:', binaryData);
            return ''; // Return a default image or an empty string if binaryData is invalid
        }
    
        try {
            return `data:${binaryData.contentType};base64,${binaryData.data}`;
        } catch (error) {
            console.error('Error converting image:', error);
            return ''; // Return a default image or an empty string in case of an error
        }
    };
    
    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.REACT_APP_API_URL;
        if (window.confirm("Are you sure you want to delete this feed item?")) {
            fetch(`${apiUrl}/deleteFeedItem`, {
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
            <Row className="g-4">
            {feedItems.map((item) => (
    <Row key={item._id} className="g-4">
        <Col>
            <Card className="h-100">
                <Row>
                    <Col md={6} className="p-0">
                        {item.pictures && item.pictures.map((pic, picIndex) => (
                            pic.data ? 
                            <Card.Img 
                                key={picIndex} 
                                className="full-width-image" 
                                src={convertToImageUrl(pic)}
                                alt={`Feed item ${item._id}`} 
                            /> 
                            : null
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
    </Row>
))}
            </Row>
        </Container>
    );
};

export default FeedDisplay;
