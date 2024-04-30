import React, { useState } from "react";
import { Col, Row, Button } from 'react-bootstrap';
import { useMutation, useQueryClient   } from 'react-query';
import { InfoRow, recordTitles, cardConfigurations, pdfComponents, renderApprovalButtons, determineCondition, gradientClasses } from "./CardMisc";
import { RejectionModal } from './Modals/RejectionModal';
import { RejectionHistoryModal } from './Modals/RejectionHistoryModal';
import { AmendmentsModal } from "./Modals/AmendmentsModal";
import '../../css/Viewer.css'

export const BasicCard = ({ record, cardType }) => {
    // States for the rejection modals
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showRejectionHistoryModal, setShowRejectionHistoryModal] = useState(false);
    const [showAmendmentsModal, setShowAmendmentsModal] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL
    const queryClient = useQueryClient();

    const handleSaveReject = (comments, dateTime, signature, username) => {
        // Now you can use these values to perform any logic, such as an API call or local state update
        rejectMutation.mutate({ comments, dateTime, signature, username });
    };

    const handleSaveAmendment = (data, amendedBy, signatureData) => {
        console.log(data); // This will now contain all the record-related fields
        console.log(amendedBy, signatureData); // Separate logging for clarity
        updateAmendments.mutate({data,amendedBy,signatureData, record})
    };

    // Mutation for approving a record
    const approveMutation = useMutation(newStatus => fetch(`${apiUrl}/updateApproval`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ recordId: record._id, status: newStatus, modelName:cardType, approver:localStorage.getItem("username") })
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchRecords']);
        }
    });

    const usr = localStorage.getItem('username');

    // Mutation for rejecting a record
    const rejectMutation = useMutation(({ comments, dateTime, signature, username }) => fetch(`${apiUrl}/updateRejection`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ recordId: record._id, comments, signature, dateTime, username })
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchRecords']);
            handleCloseRejectModal();
        },
        onError: (error) => {
            alert('Error processing rejection: ' + error.message);
        }
    });

    const updateAmendments = useMutation(({ data,amendedBy,signatureData, record}) => fetch(`${apiUrl}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ data,amendedBy,signatureData, record })
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchRecords']);
            handleCloseShowAmendmentsModal();
        },
        onError: (error) => {
            alert('Error processing rejection: ' + error.message);
        }
    });

    const handleApprove = () => {
        approveMutation.mutate('approved');
    };

    const handleCloseRejectModal = () => {
        setShowRejectModal(false);
    };

    const formatDateTime = (dateTimeString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTimeString).toLocaleString(undefined, options);
    };

    const gradientClass = gradientClasses[record.status] || '';
    const rowsToRender = cardConfigurations[cardType];
    const PdfComponent = pdfComponents[cardType];
    const condition = determineCondition(record);

    const handleShowRejectionHistoryModal = () => setShowRejectionHistoryModal(true);
    const handleCloseRejectionHistoryModal = () => setShowRejectionHistoryModal(false);

    const handleShowAmendmentsModal = () => setShowAmendmentsModal(true);
    const handleCloseShowAmendmentsModal = () => setShowAmendmentsModal(false);
    
    return (
        <Col sm={12} md={6} lg={4} className="mb-4" key={record._id}>
            <div className={`card ${gradientClass}`}>
                <div className="card-body d-flex flex-column justify-content-around">
                    <h4 className="card-title text-center">{recordTitles[record.type]}</h4>
                    <div className="info-rows">
                        {rowsToRender.map(row => {
                            let value;
                        if (row === 'ipcNumber' && record['ipcNumber']) {
                            value = record['ipcNumber'];
                        } else if (row === 'dateTime') {
                            value = formatDateTime(record[row]);
                        } else {
                            value = record[row];
                        }
                        return value ? <InfoRow label={row} value={value} key={row} /> : null;
                        })}
                    </div>
                    <Row className="card-actions">
                        <Col className="approval-buttons">
                            {renderApprovalButtons({
                                condition,
                                onApprove: handleApprove,
                                onReject: () => setShowRejectModal(true),
                                record
                            })}
                        </Col>
                        <Col className="pdf-component">
                            <PdfComponent {...record} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {record.status === 'rejected' && (
                                <Button 
                                    style={{ backgroundColor: '#F15156', borderColor: '#F15156' }} 
                                    onClick={handleShowRejectionHistoryModal}>
                                    View Rejection History
                                </Button>
                            )}
                        </Col>
                        <Col>
                            {(record.status === 'rejected' && record.author === usr) && (
                                <Button
                                    onClick={handleShowAmendmentsModal}
                                    style={{ backgroundColor: '#5E807F', borderColor: '#5E807F' }} >
                                    Make Amendments
                                </Button>
                            )}
                        </Col>
                    </Row>
                </div>
            </div>

            <RejectionModal
                showRejectModal={showRejectModal}
                handleCloseRejectModal={handleCloseRejectModal}
                onSaveReject={handleSaveReject}
                dateTime={new Date().toLocaleString()}
            />

            <RejectionHistoryModal
                showRejectionHistoryModal={showRejectionHistoryModal}
                handleCloseRejectionHistoryModal={handleCloseRejectionHistoryModal}
                record={record}
            />

            <AmendmentsModal 
            showAmendmentsModal = {showAmendmentsModal}
            handleCloseAmendments = {handleCloseShowAmendmentsModal}
            onSaveAmendments = {handleSaveAmendment}
            record={record}
             />

        </Col>
    );
};
