import React from 'react';
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form'

import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setMessage(''); // Clear any previous messages
  
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          credentials: 'include', // needed to handle cookies
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
          // Redirect or further actions after successful login
            return <Navigate to="/HomePage" />;

        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage('Error connecting to the server');
        console.error('Error:', error);
      }
    }

    const form = useForm({
        initialValues: {
          email: '',
          termsOfService: false,
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
      });
    
      return (
        <h1>Login</h1>
      );
  };

export default LoginPage;
