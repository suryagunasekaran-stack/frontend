import React from "react";
import { Col } from 'react-bootstrap';
import { InfoRow, recordTitles, gradientClasses, cardConfigurations, pdfComponents, renderApprovalButtons } from "./CardMisc";
import '../../css/Viewer.css'

export const BasicCard = ({record, cardType, onApprove, onReject}) => {
    const gradientClass = gradientClasses[record.status] || ''; // Default to empty string if status is not found
    const rowsToRender = cardConfigurations[cardType];
    const PdfComponent = pdfComponents[cardType]
    const isSupervisorAndPending = localStorage.getItem('role') === 'supervisor' && record.status === 'pending';
    return (
        <Col sm={12} md={6} lg={4} className="mb-4" key={record._id}>
            <div className={`card ${gradientClass}`} >
                <div className="card-body">
                    <h4 className="card-title text-center">
                        {recordTitles[record.type]}
                    </h4>
                    {rowsToRender.map(row => (
                        <InfoRow label={row} value={record[row]} key={row} />
                    ))}
                    {renderApprovalButtons({ isSupervisorAndPending, onApprove, onReject })}
                    <div className="d-flex justify-content-end">
                        <PdfComponent className="w-100" {...record} />
                    </div>
                </div>
            </div>
        </Col>
    );
}