import React from "react";
import { Row, Col, Button, Badge } from "react-bootstrap";
import PdfAnchor from "../PdfGenerator/PdfAnchor";
import PdfGenerator from "../PdfGenerator/Pdfgenarator";
import PdfSafety from "../PdfGenerator/PdfSafety";
import '../../css/Viewer.css'

export const InfoRow = ({ label, value }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedLabel = capitalizeFirstLetter(label);
  let capitalizedValue = value;

  if (typeof value === 'string') {
    capitalizedValue = capitalizeFirstLetter(value);
  }

  return (
    <Row style={{ fontFamily: "'Teko', sans-serif", fontSize: "20px" }} className="card-text">
      <Col xs={6} className="text-left">{capitalizedLabel}:</Col>
      <Col xs={6} className="text-left">{capitalizedValue}</Col>
    </Row>
  );
};


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
  masssafety: ['trade', 'date', 'topic'],
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


export const renderApprovalButtons = ({condition, onApprove, onReject, record}) => {
    if (condition === 'supervisorAndPending') {
        return (
            <>
                <Col xs={4} className="d-flex align-items-center justify-content-end">
                    <Button variant="success" onClick={onApprove} >Approve</Button>
                    <Button variant="danger" onClick={onReject} >Reject</Button>
                </Col>
            </>
        );
    } else if (condition === 'supervisorAndApproved') {
      const approverName = record.finalApprover ? record.finalApprover.toUpperCase() : localStorage.getItem('username').toUpperCase();
      return (
          <>
              <Col xs={4} className="d-flex align-items-center justify-content-end">
                  <Badge bg="success">Approved By: {approverName}</Badge>
              </Col>
          </>
      );
  } else if (condition === 'supervisorAndRejected') {
    const approverName = record.finalApprover ? record.finalApprover.toUpperCase() : localStorage.getItem('username').toUpperCase();
    return (
        <>
            <Col xs={4} className="d-flex align-items-center justify-content-end">
                <Badge bg="danger">Rejected By: {approverName}</Badge>
            </Col>
        </>
    );
}
    return null;
};

export const useApproveRecord = () => {
  const handleApprove = async (recordId, updatedStatus, updateRecordsCallback, cardType) => {
        const token = localStorage.getItem('token');
        const approver = localStorage.getItem('username');
        const apiUrl = process.env.REACT_APP_API_URL;
        const modelName = cardData[cardType]
        const response = await fetch(`${apiUrl}/updateRecordStatus`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include your auth token if needed
            },
            body: JSON.stringify({ id: recordId, status: updatedStatus, modelName, approver})
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

export const determineCondition = (record) => {
  const status = record.status;
  const role = localStorage.getItem('role')

  const conditionMap = {
      'supervisor_pending': 'supervisorAndPending',
      'supervisor_approved': 'supervisorAndApproved',
      'supervisor_rejected': 'supervisorAndRejected',
      'other_pending': 'notSupervisorAndPending',
      'other_approved': 'notSupervisorAndApproved',
      'other_rejected': 'notSupervisorAndRejected'
  };

  const conditionKey = `${role === 'supervisor' ? 'supervisor' : 'other'}_${status}`;
  return conditionMap[conditionKey] || 'other';
};