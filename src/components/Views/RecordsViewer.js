import React, { useCallback } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BasicCard } from '../Misc/BasicCard';
import { useApproveRecord, cardRoutes } from '../Misc/CardMisc';
import { FilterRow, cardTitle } from './ViewMisc';
import useRecordFilter from '../CustomHooks/useRecordFilter';
import '../../css/Viewer.css';

const RecordsViewer = ({ records, setRecords, currentPage, setCurrentPage, totalPages, cardType, ...otherProps }) => {
    const navigate = useNavigate();
    const handleApprove = useApproveRecord();
    const { filteredRecords, filtersConfig, clearFilters } = useRecordFilter(records);
    const updateRecords = useCallback((recordId, updatedStatus) => {
        setRecords(records.map(rec => rec._id === recordId ? { ...rec, status: updatedStatus } : rec));
    }, [records, setRecords]);

    const navigateToToolboxCreate = useCallback(() => {
        const naviroute = cardRoutes[cardType]
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
        <Container style={{minWidth: '100vw', backgroundColor: '#E5ECF4' }}>
            <div className="d-flex justify-content-between align-items-center p-3" style={{ paddingTop: "25px", paddingBottom: "25px" }}>
                <h2 className="text-left" style={{ marginLeft: "100px" }}>
                 {cardTitle[cardType]}
                </h2>
                <Button style={{ backgroundColor: '#383631', borderColor: '#383631' }} onClick={navigateToToolboxCreate}>
                    Create Record
                </Button>
            </div>

            <div className='pb-3'>
                <Row className="justify-content-end">
                    <FilterRow filters={filtersConfig} onClearFilters={clearFilters} />
                </Row>
            </div>

            <div style={{ overflowY: 'scroll', maxHeight: '100vh', border: '1px solid #ddd', padding: '15px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
                <Row>
                    {filteredRecords.map(record => (
                        <BasicCard
                            key={record._id}
                            record={record} 
                            cardType={cardType}
                            onApprove={() => handleApprove(record._id, "approved", updateRecords, cardType)}
                            onReject={() => handleApprove(record._id, "rejected", updateRecords, cardType)}
                            {...otherProps}
                        />
                    ))}
                </Row>
            </div>
            {paginationControls}
        </Container>
        
    );
};

export default RecordsViewer;
