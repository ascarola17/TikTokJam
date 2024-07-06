import React, { useState } from 'react';
import axios from 'axios';

/*
Description: Retrieving from SerpApi function from backend
Note: Check if this works and test after Raul fixes his stuff
*/ 
const SearchComponent = ({ onSearchComplete }) => {
    const [caption, setCaption] = useState('');
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.post('http://localhost:8000/serpapi_search/', { caption });
            onSearchComplete(response.data.search_results);
            setError(null);  // Clear previous errors
        } catch (err) {
            setError(err.response ? err.response.data.error : 'Unknown error occurred');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Enter search caption"
            />
            <button onClick={handleSearch}>Search</button>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default SearchComponent;
