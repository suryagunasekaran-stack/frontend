import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import imageCompression from 'browser-image-compression';

function UploadComponent({ showModal, setShowModal, cardType, recordId }) {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const maxFileSize = 5 * 1024 * 1024; // 5 MB

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        setErrorMessage('');

        if (file.size > maxFileSize) {
            setErrorMessage('File size exceeds 5 MB limit');
            return;
        }

        // Compress the image
        const compressedFile = await imageCompression(file, {
            maxSizeMB: 1, // Adjust this value based on your needs
            maxWidthOrHeight: 1024,
            useWebWorker: true,
        });
        setFile(compressedFile);
        // eslint-disable-next-line
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
            'image/bmp': [],
            'image/webp': [],
            'image/tiff': [],
            'image/svg+xml': []
        },
        maxFiles: 10,
    });

    const { mutate, isLoading } = useMutation(uploadImage, {
        onSuccess: () => {
            console.log("Upload successful!");
            setShowModal(false); // Close modal after upload
        },
        onError: (error) => {
            console.error("Upload failed:", error);
            setErrorMessage('Upload failed, please try again.');
        }
    });

    const handleUpload = () => {
        if (file) {
            mutate(file);
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Upload Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px', cursor: 'pointer' }}>
                    <input {...getInputProps()} />
                    Drag 'n' drop an image here, or click to select one
                </div>
                {file && <p>Selected file: {file.name}</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpload} disabled={!file || isLoading}>
                    Upload
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

async function uploadImage(files, cardType, recordId) {
    const formData = new FormData();

    // Convert the FileList to an array
    Array.from(files).forEach((file) => {
        formData.append('images', file); // Use the 'images' field to align with the backend
    });

    formData.append('cardType', cardType);
    formData.append('recordId', recordId);
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');
    console.log(cardType, recordId)

    const response = await fetch(`${apiUrl}/cardpermit`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}



export default UploadComponent;
