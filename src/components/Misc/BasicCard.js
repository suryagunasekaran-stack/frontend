import React from "react";
import { Col, Row } from 'react-bootstrap';
import { InfoRow, recordTitles, gradientClasses, cardConfigurations, pdfComponents, renderApprovalButtons, determineCondition } from "./CardMisc";
import '../../css/Viewer.css'

export const BasicCard = ({record, cardType, onApprove, onReject}) => {
    const gradientClass = gradientClasses[record.status] || ''; // Default to empty string if status is not found
    const rowsToRender = cardConfigurations[cardType];
    const PdfComponent = pdfComponents[cardType]
    let condition = determineCondition(record);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
      
      const formatDateTime = (dateTimeString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTimeString).toLocaleString(undefined, options);
      };
    return (
        <Col sm={12} md={6} lg={4} className="mb-4" key={record._id}>
            <div className={`card ${gradientClass}`}>
                <div className="card-body d-flex flex-column justify-content-around">
                    <h4 className="card-title text-center">
                        {recordTitles[record.type]}
                    </h4>
                    <div className="info-rows">
                    {rowsToRender.map(row => {
                        let value;
                        if (row === 'ipcNumber' && record['ipcNumber']) {
                            value = record['ipcNumber'];
                        } else if (row === 'date') {
                            value = formatDate(record[row]);
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
                            {renderApprovalButtons({ condition, onApprove, onReject, record })}
                        </Col>
                        <Col className="pdf-component">
                            <PdfComponent {...record} />
                        </Col>
                    </Row>
                </div>
            </div>
        </Col>
    );
}