import React, { useState, useRef } from 'react';
import MediaUpload from './MediaUpload';
import HandleLink from './HandleLink';
import ImageReveal from './ImageReveal';
import ProgressCards from './ProgressCards';
import SnippingTool from './SnippingTool';
import './App.css';

function App() {
    const [isMediaUploaded, setIsMediaUploaded] = useState(false);
    const [isLinkUploaded, setIsLinkUploaded] = useState(false);
    const [videoSource, setVideoSource] = useState(null);
    const videoContainerRef = useRef(null);

    const handleMediaUploadComplete = (file) => {
        setVideoSource(URL.createObjectURL(file));
        setIsMediaUploaded(true);
        setIsLinkUploaded(false);
    };

    const handleLinkUploadComplete = (url) => {
        setVideoSource(url);
        setIsLinkUploaded(true);
        setIsMediaUploaded(false);
    };

    const handleStartOver = () => {
        window.location.reload();
    };

    return (
        <div className="App">
            <h1 className="main-header">TikTok Jam</h1>
            <div className="main-container">
                {!isMediaUploaded && !isLinkUploaded && (
                    <div className="content-container">
                        <MediaUpload hidden={isLinkUploaded} onUploadComplete={handleMediaUploadComplete} />
                        <HandleLink hidden={isMediaUploaded} onUploadComplete={handleLinkUploadComplete} />
                    </div>
                )}
                {(isMediaUploaded || isLinkUploaded) && (
                    <SnippingTool videoContainerRef={videoContainerRef} videoSource={videoSource} />
                )}
                {(isMediaUploaded || isLinkUploaded) && (
                    <button className="start-over-button" onClick={handleStartOver}>Start Over</button>
                )}
            </div>
            <h2 className="main-product-result">Your Main Product Result</h2>
            <div className="image-and-cards-container">
                <div className="image-container">
                    <ImageReveal src="/images/image1 2.png" alt="Static Image" />
                    <h2 className="other-products">Some Other Products You Might Be Interested In</h2>
                    <ProgressCards />
                </div>
            </div>
        </div>
    );
}

export default App;
