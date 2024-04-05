import React, { useState } from 'react';
import { Row, Button, Spinner, Alert } from 'react-bootstrap';
import useMetaData from '../CustomHooks/useMetaData';
import ProfileCard from './ProfileCard';
import '../../css/Metafileuser.css';

const Retmetauser = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError, error } = useMetaData(page);

    // Handling the next and previous page functions
    const onNext = () => {
        setPage(currentPage => currentPage + 1);
    };

    const onPrevious = () => {
        setPage(currentPage => Math.max(1, currentPage - 1));
    };

    if (isLoading) {
        return <Spinner animation="border" />;
    }

    if (isError) {
        return <Alert variant="danger">Error: {error.message}</Alert>;
    }

    const metaData = data?.data || [];

    return (
        <div className="scrollableContainer">
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
        </div>
    );
};

export default Retmetauser;
