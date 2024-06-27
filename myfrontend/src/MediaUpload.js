import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MediaUpload.css';

function MediaUpload() {
    const [file, setFile] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFileURL, setUploadedFileURL] = useState('');
    const [error,setError] = useState();
    const [isUploading, setIsUploading] = useState(false);

    function handleChange(event) {
        setFile(event.target.files[0])
    }
    function handleSubmit(event){
        event.preventDefault();
        if (!file) {
            setError(new Error('No file selected.'));
            return;
        }
        setIsUploading(true); // Set upload status to true
        const url = 'http://localhost:3000/api/upload/'
        const formData = new FormData();
        formData.append('file','file');
        formData.append('fileName',file.name);

        const config ={
            headers: {
                'content-type':'multipart/form-data',
            },
            onUploadProgress: function(progressEvent){
                const percentCompleted =Math.round((progressEvent.loaded * 100) / progressEvent.total);
                
            }
        };
        axios.post(url,formData, config).then((response) => {
            console.log(response.data);
            setUploadedFileURL(response.data.fileUrl); // Adjust based on your backend response
            setIsUploading(false);
        })
        .catch((error) => {
            console.error("Error uploading file: ", error);
            setError(error);
            setIsUploading(false);
          });
    
    }

    return (
        <div className="MediaUpload">
            <form onSubmit ={handleSubmit}>
                <h1>Upload Media</h1>
                <input type='file' onChange={handleChange}/>
                <button type = "submit">Upload</button>
                {isUploading && <progress value={uploadProgress} max="100"></progress>} {/* Conditionally render progress bar */}
            </form> 
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