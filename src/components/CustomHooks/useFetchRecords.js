import { useQuery } from 'react-query';

const useFetchRecords = (apiEndpoint, cardType, currentPage, limit = 30) => {
  const fetchRecords = async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');

    // Determine if the user is a supervisor
    const isSupervisor = role === 'supervisor';
    console.log(isSupervisor)

    const apiUrl = process.env.REACT_APP_API_URL;

    // Construct URL with query parameters
    const url = new URL(`${apiUrl}${apiEndpoint}`);
    url.searchParams.append('type', cardType);
    url.searchParams.append('page', currentPage);
    url.searchParams.append('limit', limit);
    url.searchParams.append('authorId', username);
    url.searchParams.append('isSupervisor', isSupervisor);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  };

  const { data, isLoading, isError, error } = useQuery(
    ['fetchRecords', apiEndpoint, cardType, currentPage, limit],
    fetchRecords,
    {
      staleTime: 300000, // 5 minutes to avoid unnecessary re-fetching
      cacheTime: 600000, // 10 minutes caching
      keepPreviousData: true, // Retain data while fetching new records
    }
  );

  const records = data?.records ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { records, isLoading, isError, error, totalPages };
};

export default useFetchRecords;


