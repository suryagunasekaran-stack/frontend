import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQueryClient } from 'react-query';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import imageCompression from 'browser-image-compression';

function UploadComponent({ showModal, setShowModal, cardType, recordId }) {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    const queryClient = useQueryClient();

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
            queryClient.invalidateQueries(['fetchRecords']);
            setShowModal(false); // Close modal after upload
        },
        onError: (error) => {       
            setErrorMessage('Upload failed, please try again.');
        }
    });

    const handleUpload = () => {
        if (file) {
            mutate({ files: file, cardType, recordId });
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

async function uploadImage({ files, cardType, recordId }) {
    console.log('Files:', files); // Debugging statement

    const formData = new FormData();

    if (files instanceof Blob) {
        // Handle single Blob or File
        formData.append('images', files);
    } else if (Array.isArray(files) || files instanceof FileList) {
        // Handle array or FileList
        Array.from(files).forEach(file => {
            formData.append('images', file);
        });
    } else {
        console.warn('Unexpected file input:', files);
    }

    formData.append('cardType', cardType);
    formData.append('recordId', recordId);
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    const response = await fetch(`${apiUrl}/cardpermit`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        method: 'POST',
        mode: 'cors',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}



export default UploadComponent;
