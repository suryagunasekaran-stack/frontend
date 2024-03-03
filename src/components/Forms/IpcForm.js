import React, { useState } from 'react';
import XLSX from 'xlsx';

const ExcelUploadComponent = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const binaryString = event.target.result;
            const workbook = XLSX.read(binaryString, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const firstColumn = data.map(row => row[0]).filter(Boolean);

            try {
                const response = await fetch('/api/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ipcData: firstColumn })
                });

                if (response.ok) {
                    alert('Data saved successfully');
                } else {
                    alert('Error saving data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        reader.readAsBinaryString(file);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
            <button type="submit">Upload</button>
        </form>
    );
};

export default ExcelUploadComponent;
