import React, { useState } from 'react';

function HandleLink({ onUploadComplete }) {
    const [url, setUrl] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setUrl(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValidUrl(url)) {
            setError(new Error('Invalid URL'));
            return;
        }
        setError(null);
        onUploadComplete(url);
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    return (
        <div className="HandleLink">
            <form onSubmit={handleSubmit}>
                <h1>Upload TikTok Link</h1>
                <input
                    type="url"
                    value={url}
                    onChange={handleChange}
                    placeholder="Enter TikTok video URL"
                />
                <button type="submit">Submit</button>
            </form>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}

export default HandleLink;
