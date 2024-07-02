import React, { useState } from 'react';
import './HandleLink.css';

function HandleLink() {
    const [link, setLink] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [error, setError] = useState(null);
    const [uploadedLink, setUploadedLink] = useState('');

    const handleChange = (event) => {
        setLink(event.target.value);
        setIsUploaded(false); // Reset the uploaded state if a new link is entered
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!link) {
            setError(new Error('No link provided.'));
            return;
        }

        // Extract video ID from the link
        const regex = /\/video\/(\d+)/;
        const match = link.match(regex);
        if (!match || !match[1]) {
            setError(new Error('Invalid TikTok link.'));
            return;
        }

        const videoId = match[1];
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            setIsUploaded(true);
            setUploadedLink(`https://www.tiktok.com/embed/v2/${videoId}`);
        }, 1000); // Simulate a delay for "uploading"
    };

    const handleStartOver = () => {
        setLink('');
        setIsUploading(false);
        setIsUploaded(false);
        setError(null);
        setUploadedLink('');
    };

    return (
        <div className="HandleLink">
            {!isUploaded ? (
                <form onSubmit={handleSubmit}>
                    <h1></h1> 
                    <input 
                        type="text" 
                        placeholder="Enter TikTok video link" 
                        value={link} 
                        onChange={handleChange} 
                    />
                    <button type="submit" disabled={isUploading}>Upload</button>
                    {isUploading && <p>Uploading...</p>}
                </form>
            ) : (
                <button onClick={handleStartOver}>Start Over</button>
            )}
            {uploadedLink && (
                <div className="video-container">
                    <iframe
                        src={uploadedLink}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="TikTok Video"
                    ></iframe>
                </div>
            )}
            {error && <p className="error">{error.message}</p>}
        </div>
    );
}

export default HandleLink;
