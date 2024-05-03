import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const RejectionHistoryModal = ({ showRejectionHistoryModal, handleCloseRejectionHistoryModal, record }) => {


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
                                <p><strong>Date:</strong> {(rejection.dateTime)}</p>
                                <p><strong>Author:</strong> {rejection.commentedby}</p>
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
