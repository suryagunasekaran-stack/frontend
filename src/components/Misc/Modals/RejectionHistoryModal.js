import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const RejectionHistoryModal = ({ showRejectionHistoryModal, handleCloseRejectionHistoryModal, record }) => {
    const formatDateTime = (dateTimeString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTimeString).toLocaleString(undefined, options);
    };

    return (
        <Modal show={showRejectionHistoryModal} onHide={handleCloseRejectionHistoryModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Rejection History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {record.rejections && record.rejections.length > 0 ? (
                    <ul>
                        {record.rejections.map((rejection, index) => (
                            <li key={index}>
                                <p><strong>Date:</strong> {formatDateTime(rejection.dateTime)}</p>
                                <p><strong>Comments:</strong> {rejection.commentedby}</p>
                                <p><strong>Comments:</strong> {rejection.comments}</p>
                                <img src={rejection.signature} alt="Signature" style={{ width: '100%', height: 'auto' }} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No rejection history available.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseRejectionHistoryModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
