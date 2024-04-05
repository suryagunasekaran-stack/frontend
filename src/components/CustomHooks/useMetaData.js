import { useQuery } from 'react-query';

const useMetaData = (page, searchTerm, limit = 12) => {
    const fetchMetaData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const token = localStorage.getItem('token');

        // Constructing the URL with conditional search parameters
        let url = `${apiUrl}/getMetaData?page=${page}&limit=${limit}`;
        if (searchTerm && searchTerm.trim() !== '') {
            url = `${apiUrl}/searchusermeta?term=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`;
        }

        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        } catch (error) {
            throw error;
        }
    };

    // The query key includes the search term to refetch data when it changes
    const { data, isLoading, isError, error } = useQuery(['fileData', page, searchTerm], fetchMetaData);

    return { data, isLoading, isError, error };
};

export default useMetaData;


