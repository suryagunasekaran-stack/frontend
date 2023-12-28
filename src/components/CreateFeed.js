import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { IoCloudUploadOutline } from 'react-icons/io5';
import '../css/FeedItemForm.css';


const FeedItemForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles);
        // Now you can do something with the files
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    // This is a template for the onSubmit function, you need to implement the actual logic
    const onSubmitForm = async (data, e) => {
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
    
            Object.keys(data).forEach(key => formData.append(key, data[key]));
            formData.append('author', localStorage.getItem("username")); // Add the author to the FormData
            files.forEach(file => formData.append('pictures', file, file.name));
            const response = await fetch('http://localhost:3000/newFeeditem', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });
    
            if (response.ok) {
                const responseData = await response.json();
                console.log('Server response:', responseData);
                alert('Success: Operation completed successfully.');
            } else {
                console.error('Server error:', response.status);
                alert('Error: Operation failed. Status code: ' + response.status);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmitForm)}>
                
            <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Title</Form.Label>
                    <Col sm="10">
                        <Form.Control {...register('title', { required: true })} />
                        {errors.title && <span className="text-danger">Title is required</span>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Message</Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" {...register('message', { required: true })} />
                        {errors.message && <span className="text-danger">Message is required</span>}
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <IoCloudUploadOutline size="3em" />
                            <p>Drag and drop some files here, or click to select files</p>
                        </div>
                        {files.length > 0 && (
                            <ul>
                                {files.map(file => (
                                    <li key={file.path}>{file.name}</li>
                                ))}
                            </ul>
                        )}
                    </Col>
                </Form.Group>

                <Button type="submit">Post</Button>
            </Form>
        </Container>
    );
};

export default FeedItemForm;
