import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import PdfAnchor from "./PdfAnchor";
import PdfGenerator from "./Pdfgenarator";
import PdfSafety from "./PdfSafety";
import '../css/Viewer.css'

export const InfoRow = ({ label, value }) => (
    <Row style={{ fontFamily: "'Teko', sans-serif", fontSize: "20px" }} className="card-text">
      <Col xs={6} className="text-left">{label}:</Col>
      <Col xs={6} className="text-left">{value}</Col>
    </Row>
  );

export const recordTitles = {
    dailymeeting: 'DAILY TOOLBOX MEETING AND PPE RECORD',
    contractorsmeeting: 'CONTRACTORS TOOLBOX MEETING AND PPE RECORD',
    transportmeeting: 'TRANSPORT MEETING RECORD',
  };

export const gradientClasses = {
    pending: 'gradient-pending',
    rejected: 'gradient-rejected',
    approved: 'gradient-approved',
};

export const cardConfigurations = {
  toolbox: ['department', 'dateTime', 'author', 'raNumber', 'vessel', 'topic'],
  anchor: ['department', 'dateTime', 'author', 'raNumber', 'vessel', 'topic'],
  masssafety: ['department', 'author', 'topic'],
};

export const pdfComponents = {
  toolbox: PdfGenerator,
  masssafety: PdfSafety,
  anchor: PdfAnchor,
  // Add other mappings as needed
};


export const renderApprovalButtons = ({isSupervisorAndPending, onApprove, onReject}) => {
    if (isSupervisorAndPending) {
        return (
            <>
                <Col xs={4} className="d-flex align-items-center justify-content-end">
                    <Button variant="success" onClick={onApprove} >Approve</Button>
                    <Button variant="danger" onClick={onReject} >Reject</Button>
                </Col>
            </>
        );
    }
    return null;
};

export const useApproveRecord = () => {
  const handleApprove = async (recordId, updatedStatus, updateRecordsCallback) => {
      // ... your API call logic
      const token = localStorage.getItem('token'); // Get the username from localStorage
        // Call to backend to update status
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/updateRecordStatus`, {
            method: 'PUT', // or 'PATCH'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include your auth token if needed
            },
            body: JSON.stringify({ id: recordId, status: updatedStatus, modelName: "MainData" })
        });

      if (response.ok) {
          // Call the callback function to update records in the parent component
          updateRecordsCallback(recordId, updatedStatus);
      } else {
          // Handle error
          console.error('Failed to update record status');
      }
  };

  return handleApprove;
};
