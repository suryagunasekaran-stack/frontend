import React, { useState } from 'react';
import { Row, Button, Spinner, Alert, Form, Container, Col } from 'react-bootstrap';
import useMetaData from '../CustomHooks/useMetaData';
import ProfileCard from './ProfileCard';
import '../../css/Metafileuser.css';

const Retmetauser = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const { data, isLoading, isError, error } = useMetaData(page, searchTerm);

    // Handling the next and previous page functions
    const onNext = () => {
        setPage(currentPage => currentPage + 1);
    };

    const onPrevious = () => {
        setPage(currentPage => Math.max(1, currentPage - 1));
    };

    const metaData = data?.data || [];

    return (
        <div className="scrollableContainer">
            <Container fluid>
                <Row className="mb-3">
                    <Col md={4} lg={3}>
                        <Form>
                            <Form.Group controlId="searchInput">
                                <Form.Control 
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

                {isLoading && <Spinner animation="border" />}
                {isError && <Alert variant="danger">Error: {error.message}</Alert>}
            <Row xs={1} md={2} lg={3}>
                {metaData.map((item, index) => (
                    <ProfileCard key={index} item={item} />
                ))}
            </Row>
            <div className="pagination">
                <Button onClick={onPrevious} disabled={page === 1}>Previous</Button>
                <span>Page {page}</span>
                <Button onClick={onNext}>Next</Button>
            </div>
            </Container>
        </div>
    );
};

export default Retmetauser;
