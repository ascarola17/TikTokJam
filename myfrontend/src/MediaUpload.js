import React, { useState } from 'react';
import './MediaUpload.css';

function MediaUpload({ hidden, onUploadComplete }) {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFileURL, setUploadedFileURL] = useState('');
    const [error, setError] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false); // Track if the upload is complete

    function handleChange(event) {
        setFile(event.target.files[0]);
        setIsUploaded(false); // Reset the uploaded state if a new file is selected
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!file) {
            setError(new Error('No file selected.'));
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        // Simulate a file upload
        setTimeout(() => {
            // Mock progress
            const interval = setInterval(() => {
                setUploadProgress(prevProgress => {
                    if (prevProgress >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prevProgress + 10;
                });
            }, 100);

            // Simulate backend response
            setTimeout(() => {
                clearInterval(interval);
                setIsUploading(false);
                setIsUploaded(true); // Mark upload as complete
                setUploadedFileURL(URL.createObjectURL(file)); // Set video URL after "upload"
                setUploadProgress(100);
                onUploadComplete(); // Notify parent component
            }, 1000);
        }, 100);
    }

    function handleStartOver() {
        setFile(null);
        setUploadedFileURL('');
        setUploadProgress(0);
        setError(null);
        setIsUploading(false);
        setIsUploaded(false);
    }

    if (hidden) {
        return null; // Do not render if hidden
    }

    return (
        <div className="MediaUpload">
            {!isUploaded ? (
                <form onSubmit={handleSubmit}>
                    <h1>Upload Media</h1>
                    <input type="file" onChange={handleChange} />
                    <button type="submit" disabled={isUploading}>Upload</button>
                    {isUploading && <progress value={uploadProgress} max="100"></progress>}
                </form>
            ) : (
                <button onClick={handleStartOver}>Start Over</button>
            )}
            {uploadedFileURL && (
                <div className="video-container">
                    <video src={uploadedFileURL} controls loop autoPlay />
                </div>
            )}
            {error && <p>Error uploading file: {error.message}</p>}
        </div>
    );
}

export default MediaUpload;
