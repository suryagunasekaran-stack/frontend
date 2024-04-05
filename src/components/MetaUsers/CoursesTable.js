import React from 'react';
import { Table } from 'react-bootstrap';
import { getRemainingDaysBadge } from '../Misc/MetaMisc';

const CoursesTable = ({ courses, withExpiry }) => {
  return (
    <Table borderless size="sm">
      <thead>
        <tr>
          <th>Course Name</th>
          {withExpiry ? <><th>Expiry Date</th><th>Status</th></> : <th>Date</th>}
        </tr>
      </thead>
      <tbody>
        {courses.map((course, idx) => (
          <tr key={idx}>
            <td>{course.courseName}</td>
            {withExpiry ? (
              <>
                <td>{course.expiryDate || '-'}</td>
                <td>{getRemainingDaysBadge(course.expiryDate)}</td>
              </>
            ) : (
              <td>{course.date || 'N/A'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CoursesTable;

