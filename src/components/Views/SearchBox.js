import React, { useState } from 'react';

const SearchBox = ({ type }) => { // Accept 'type' as a prop
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        const token = localStorage.getItem('token'); // If required for authorization
        const apiUrl = process.env.REACT_APP_API_URL + "/searchrecords";
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                searchQuery, // The search query entered by the user
                type, // Use the type passed in as a prop
                limit: 10, // Adjust as needed
                page: 1, // Start from the first page
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setSearchResults(data); // Store search results in state
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                placeholder="Enter search query" // Placeholder text for input
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {searchResults.map((result) => (
                    <li key={result._id}>{result.title || result.name}</li> // Display search results
                ))}
            </ul>
        </div>
    );
};

export default SearchBox;
