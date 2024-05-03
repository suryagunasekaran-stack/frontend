import React from "react";
import PdfAnchor from "../PdfGenerator/PdfAnchor";
import PdfGenerator from "../PdfGenerator/Pdfgenarator";
import PdfSafety from "../PdfGenerator/PdfSafety";
import { Button, Badge, Row, Col } from 'react-bootstrap';
import '../../css/Viewer.css'

export const InfoRow = ({ label, value }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedLabel = capitalizeFirstLetter(label);
  const capitalizedValue = typeof value === 'string' ? capitalizeFirstLetter(value) : value;

  return (
    <Row className="info-row" style={{ fontFamily: "'Teko', sans-serif", fontSize: "30px" }}>
      {/* Adjusted column widths for better distribution */}
      <Col xs={5} style={{ textAlign: 'left', whiteSpace: 'nowrap' }} >
    {capitalizedLabel}
      </Col>
      <Col xs={1} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
          :
      </Col>
      <Col xs={6} style={{
          textAlign: 'right',
          whiteSpace: 'nowrap',
          overflowX: 'auto',  // Enables horizontal scrolling

          scrollbarWidth: 'none',  // For Firefox
          msOverflowStyle: 'none',  // For Internet Explorer 10+
          '&::-webkit-scrollbar': {
              display: 'none'  // For Chrome, Safari, and Opera
          }
      }}>
    {capitalizedValue}
</Col>

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
  toolbox: ['department', 'dateTime', 'author', 'raNumber', 'vessel', 'topic', 'ipcNumber'],
  anchor: ['department', 'dateTime', 'author', 'raNumber', 'vessel', 'topic', 'ipcNumber'],
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


// Revised renderApprovalButtons function
export const renderApprovalButtons = ({ condition, onApprove, onReject, record, onViewRejectionHistory }) => {
  return (
      <>
          {condition === 'supervisorAndPending' && (
            <>
              <Row>
                  <Col xs={4}>
                      <Button style={{ marginRight: '10px'  }} className="button-approve" onClick={onApprove}>
                          Approve
                      </Button>
                  </Col>
              </Row>
              <Row>
                <Col>
                      <Button className="button-reject" onClick={onReject}>
                          Reject
                      </Button>
                </Col>
              </Row>
              </>
          )}
          {condition === 'supervisorAndApproved' && (
              <Badge bg="success">Approved By: {record.finalApprover || localStorage.getItem('username').toUpperCase()}</Badge>
          )}
          {condition === 'supervisorAndRejected' && (
              <Badge bg="danger">Rejected By: {record.finalApprover || localStorage.getItem('username').toUpperCase()}</Badge>
          )}
      </>
  );
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