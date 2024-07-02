import React, { useState } from 'react';
import './MediaUpload.css';

function MediaUpload({ hidden, onUploadComplete }) {
    const [file, setFile] = useState(null);
    const [uploadedFileURL, setUploadedFileURL] = useState('');
    const [error, setError] = useState(null);

    function handleChange(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setUploadedFileURL(URL.createObjectURL(selectedFile));
            onUploadComplete(selectedFile);
        } else {
            setError(new Error('No file selected.'));
        }
    }

    function handleStartOver() {
        setFile(null);
        setUploadedFileURL('http://localhost:3000/upload');
        setError(null);
    }

    if (hidden) {
        return null; // Do not render if hidden
    }

    return (
        <div className="MediaUpload">
            {!file ? (
                <form>
                    <h1>Upload Media</h1>
                    <input type="file" onChange={handleChange} accept="video/*" />
                </form>
            ) : (
                <button onClick={handleStartOver}>Start Over</button>
            )}
            {uploadedFileURL && (
                <div className="video-container">
                </div>
            )}
            {error && <p>Error uploading file: {error.message}</p>}
        </div>
    );
}

export default MediaUpload;
