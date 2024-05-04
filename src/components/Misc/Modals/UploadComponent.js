import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function UploadComponent({ showModal, setShowModal }) {
    const [file, setFile] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

    const { mutate, isLoading } = useMutation(uploadImage, {
        onSuccess: () => {
            console.log("Upload successful!");
            setShowModal(false); // Close modal after upload
        },
        onError: (error) => {
            console.error("Upload failed:", error);
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
                    Drag 'n' drop some files here, or click to select files
                </div>
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

// Function to simulate image upload to backend
async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export default UploadComponent;  // Exporting the component
