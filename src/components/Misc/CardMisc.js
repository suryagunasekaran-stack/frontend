import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import PdfAnchor from "../PdfGenerator/PdfAnchor";
import PdfGenerator from "../PdfGenerator/Pdfgenarator";
import PdfSafety from "../PdfGenerator/PdfSafety";
import '../../css/Viewer.css'

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

export const cardRoutes = {
  toolbox: "/ToolboxCreate",
  anchor: "/AnchoragePreForm",
  masssafety: "/MassSafetyForm",
};

export const pdfComponents = {
  toolbox: PdfGenerator,
  masssafety: PdfSafety,
  anchor: PdfAnchor,
  // Add other mappings as needed
};

 const cardData = {
  toolbox: 'MainData',
  anchor: 'FormModel',
  masssafety: 'MassSafety',
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
  const handleApprove = async (recordId, updatedStatus, updateRecordsCallback, cardType) => {
      const token = localStorage.getItem('token');
        const apiUrl = process.env.REACT_APP_API_URL;
        const modelName = cardData[cardType]
        const response = await fetch(`${apiUrl}/updateRecordStatus`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include your auth token if needed
            },
            body: JSON.stringify({ id: recordId, status: updatedStatus, modelName})
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
