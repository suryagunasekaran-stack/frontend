import React, { useCallback } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BasicCard } from '../Misc/BasicCard';
import { cardRoutes } from '../Misc/CardMisc';
import '../../css/Viewer.css';

const RecordsViewer = ({ records, currentPage, setCurrentPage, totalPages, cardType, ...otherProps }) => {
    const navigate = useNavigate();

    const navigateToToolboxCreate = useCallback(() => {
        const naviroute = cardRoutes[cardType];
        navigate(naviroute);
    }, [navigate, cardType]);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const paginationControls = (
        <div>
            <Button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
            </Button>
            <Button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
            </Button>
        </div>
    );

    if (!records) return <p>Loading...</p>;
    if (otherProps.error) return <p>Error loading data: {otherProps.error}</p>;

    return (
        <Container style={{ minWidth: '95vw' }}>
            <div className="d-flex justify-content-between align-items-center p-3" style={{ paddingTop: "25px", paddingBottom: "25px" }}>
                <Button style={{ backgroundColor: '#383631', borderColor: '#383631' }} onClick={navigateToToolboxCreate}>
                    Create Record
                </Button>
            </div>

            <div style={{ maxHeight: '100vh' }}>
                <Row>
                    {records.map(record => (
                        <BasicCard
                            key={record._id}
                            record={record}
                            cardType={cardType}
                            {...otherProps}
                        />
                    ))}
                </Row>
                {paginationControls}
            </div>
        </Container>
    );
};

export default RecordsViewer;
