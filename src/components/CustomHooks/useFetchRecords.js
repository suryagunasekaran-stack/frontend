import { useState, useEffect } from 'react';

const useFetchRecords = (apiEndpoint) => {
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            let authorUsername = role !== 'supervisor' ? localStorage.getItem('username') : null;

            const apiUrl = process.env.REACT_APP_API_URL + apiEndpoint;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ author: authorUsername })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setRecords(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [apiEndpoint]);

    return { records, isLoading, error, setRecords };
};

export default useFetchRecords;
