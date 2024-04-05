import { useQuery } from 'react-query';

const useMetaData = (page, limit = 12) => {
    const fetchMetaData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${apiUrl}/getMetaData?page=${page}&limit=${limit}`, {
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

    const { data, isLoading, isError, error } = useQuery(['fileData', page], fetchMetaData);

    return { data, isLoading, isError, error };
};

//   // Pagination Handlers
//   const handleNext = () => {
//     setPage(currentPage => currentPage + 1);
//   };

//   const handlePrevious = () => {
//     setPage(currentPage => Math.max(1, currentPage - 1));
//   };


//   return { data, isLoading, isError, error, handleNext, handlePrevious };
// };

export default useMetaData;

