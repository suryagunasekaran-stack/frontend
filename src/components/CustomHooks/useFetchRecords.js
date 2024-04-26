import { useQuery } from 'react-query';

const useFetchRecords = (apiEndpoint, cardType, currentPage, limit = 30, searchTerm = '') => {
  const fetchRecords = async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');

    const isSupervisor = role === 'supervisor'; // Determine if the user is a supervisor

    const apiUrl = process.env.REACT_APP_API_URL;

    // Construct the base URL
    let url = new URL(`${apiUrl}${apiEndpoint}`);
    url.searchParams.append('type', cardType);
    url.searchParams.append('page', currentPage);
    url.searchParams.append('limit', limit);
    url.searchParams.append('authorId', username);
    url.searchParams.append('isSupervisor', isSupervisor);

    // Modify the URL if there's a search term
    if (searchTerm.trim() !== '') {
      url = new URL(`${apiUrl}/searchrecords`);
      url.searchParams.append('term', encodeURIComponent(searchTerm));
      url.searchParams.append('page', currentPage);
      url.searchParams.append('limit', limit);
      url.searchParams.append('type', cardType);
    }

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
    ['fetchRecords', apiEndpoint, cardType, currentPage, limit, searchTerm],
    fetchRecords,
  );

  const records = data?.records ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { records, isLoading, isError, error, totalPages };
};

export default useFetchRecords;
