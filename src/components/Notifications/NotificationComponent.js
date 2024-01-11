import React, { useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';

const NotificationComponent = () => {
    const { addToast } = useToasts();

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3000/');

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            try {
                const notification = JSON.parse(event.data);
                addToast(notification.message, { appearance: 'success' });
            } catch (e) {
                console.error('Error parsing message:', event.data, e);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, []);

    return null; // No UI needed as toasts are handled globally
};

export default NotificationComponent;
