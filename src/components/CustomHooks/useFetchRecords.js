import { useState, useEffect } from 'react';
const useFetchRecords = (apiEndpoint, cardType, currentPage, limit = 30) => {
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0); // State for total pages

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
                body: JSON.stringify({ 
                    author: authorUsername, 
                    type: cardType, 
                    limit: limit, 
                    page: currentPage // Use the currentPage passed from the HOC
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setRecords(data.records || []);
            setTotalPages(data.totalPages || 0);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [apiEndpoint, currentPage, limit]); // Use currentPage in the dependency array

    return { records, isLoading, error, setRecords, totalPages };
};

export default useFetchRecords;


