import React, { useState, useEffect } from 'react';
import { Badge, Button, Dropdown } from 'react-bootstrap';
import { FaBell } from "react-icons/fa";

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const fetchNotifications = async () => {
        try {
            const username = localStorage.getItem('username');
            const token = localStorage.getItem('token'); // Retrieve the stored token from localStorage
            const response = await fetch('http://localhost:3000/notifications', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Add the Authorization header with the token
                    'Username': username
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setNotifications([]);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const markAsRead = async (notificationId) => {
        try {
            const response = await fetch('http://localhost:3000/notifications/mark-read', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ notificationId })
            });

            if (response.ok) {
                // Update the notifications state to reflect the change
                setNotifications(notifications.map(n => {
                    if (n._id === notificationId) {
                        return { ...n, isRead: true };
                    }
                    return n;
                }));
            } else {
                throw new Error('Failed to mark notification as read');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="notification-bell">
            <Button variant="light" onClick={() => setShowDropdown(!showDropdown)}>
            <Badge pill variant="danger">
    {Array.isArray(notifications) ? notifications.filter(notif => !notif.isRead).length : 0}
</Badge>


<FaBell />
            </Button>

            <Dropdown show={showDropdown} drop="down">
                <Dropdown.Toggle as={CustomToggle} />
                <Dropdown.Menu>
                {Array.isArray(notifications) && notifications.map(notification => (
    <Dropdown.Item key={notification._id} as="div">
        {notification.message}
        {!notification.isRead && (
            <Button 
                size="sm" 
                variant="outline-success" 
                onClick={() => markAsRead(notification._id)}
            >
                Mark as Read
            </Button>
        )}
    </Dropdown.Item>
))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

// Custom Dropdown Toggle to integrate React-Bootstrap with react-icons
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <span
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </span>
));

export default NotificationBell;
