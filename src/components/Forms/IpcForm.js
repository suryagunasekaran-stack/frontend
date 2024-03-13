import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import '../../css/IpcForm.css'

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
            const workbook = read(binaryString, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            // Skip the first row and create an array of objects with key-value pairs
            const data = utils.sheet_to_json(worksheet, { header: 1 }).slice(1);
            const keyValuePairs = data.reduce((acc, row) => {
                if (row.length >= 2) {
                    acc[row[0]] = row[1];
                }
                return acc;
            }, {});
            const apiUrl = process.env.REACT_APP_API_URL;
            try {
                const response = await fetch(`${apiUrl}/saveipc`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ipcData: keyValuePairs })
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
        <div className="container excel-upload-body" style={{paddingTop: "50px"}}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card excel-upload-card p-4">
                        <div className="card-body">
                            <h3 className="card-title excel-upload-card-title text-center mb-4">Excel File Upload</h3>
                            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center gap-3">
                                <div className="mb-3 w-75">
                                    <input 
                                        type="file" 
                                        className="form-control excel-upload-form-control" 
                                        onChange={handleFileChange} 
                                        accept=".xlsx, .xls" 
                                    />
                                </div>
                                <button type="submit" className="btn excel-upload-btn-primary">Upload</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExcelUploadComponent;
