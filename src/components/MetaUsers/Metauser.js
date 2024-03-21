import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';

function Metauser() {
  const [items, setItems] = useState([]);
  const warningPeriod = 30; // Days before expiry when a warning should be issued

  const getStatus = (expiryDate) => {
    const today = dayjs();
    const expiry = dayjs(expiryDate);
    if (expiry.isBefore(today)) {
      return 'Expired';
    } else if (expiry.isBefore(today.add(warningPeriod, 'day'))) {
      return 'Expiring Soon';
    }
    return 'Valid';
  };

  const isExpiryDate = (header) => {
    // Determine if the header implies an expiry date
    return header.toLowerCase().includes('expiry date');
  };

  const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary', cellDates: true });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
      const headers = data[0];
      const rows = data.slice(1);

      const items = rows.map(row => {
        const item = {};
        const coursesAndCertificates = [];

        row.forEach((cell, index) => {
          if (index < 30) { // Columns A to AD
            if (cell instanceof Date) {
              item[headers[index]] = dayjs(cell).format('DD/MM/YYYY');
            } else {
              item[headers[index]] = cell;
            }
          } else if (index >= 30 && index <= 115) { // Columns AE to DL
            if (cell) {
              const formattedDate = dayjs(cell).format('DD/MM/YYYY');
              const courseEntry = { courseName: headers[index] };
              if (isExpiryDate(headers[index])) {
                courseEntry.expiryDate = formattedDate;
                courseEntry.status = getStatus(formattedDate);
              } else {
                courseEntry.date = formattedDate;
              }
              coursesAndCertificates.push(courseEntry);
            }
          }
        });

        item.CoursesAndCertificates = coursesAndCertificates;
        return item;
      });
      setItems(items);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcelFile(file);
        }}
      />
      {items.length > 0 && <pre>{JSON.stringify(items, null, 2)}</pre>}
    </div>
  );
}

export default Metauser;
