import React, { useState } from 'react';
import MediaUpload from './MediaUpload';
import HandleLink from './HandleLink';
import ImageReveal from './ImageReveal';
import ProgressCards from './ProgressCards';
import './App.css';

function App() {
    const [isMediaUploaded, setIsMediaUploaded] = useState(false);
    const [isLinkUploaded, setIsLinkUploaded] = useState(false);

    const handleMediaUploadComplete = () => {
        setIsMediaUploaded(true);
    };

    const handleLinkUploadComplete = () => {
        setIsLinkUploaded(true);
        setIsMediaUploaded(false);
    };

    return (
        <div className="App">
            <h1 className="main-header">TikTok Jam</h1>
            <div className="content-container">
                <MediaUpload hidden={isLinkUploaded} onUploadComplete={handleMediaUploadComplete} />
                <HandleLink onUploadComplete={handleLinkUploadComplete} />
            </div>
            <h2 className="main-product-result">Your Main Product Result</h2>
            <ImageReveal src="/images/image1.png" alt="Static Image" />
            <h2>Some Other Products You Might Be Interested In</h2>
            <div className="progress-cards-container">
                <ProgressCards />
            </div>
        </div>
    );
}

export default App;
