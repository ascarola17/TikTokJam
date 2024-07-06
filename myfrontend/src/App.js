import React, { useState, useRef } from 'react';
import MediaUpload from './MediaUpload';
import ImageReveal from './ImageReveal';
import ProgressCards from './ProgressCards';
import SnippingTool from './SnippingTool';
import './App.css';
import SearchComponent from './SearchComponent';

function App() {
    const [isMediaUploaded, setIsMediaUploaded] = useState(false);
    const [videoSource, setVideoSource] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const videoContainerRef = useRef(null);
    const resultsRef = useRef(null); // Reference for the results section

    const handleMediaUploadComplete = (file) => { 
        setVideoSource(URL.createObjectURL(file));
        setIsMediaUploaded(true);
    };

    const handleScreenshotComplete = () => {
        setShowResults(true); // Show the results after screenshot
        setTimeout(() => {
            if (resultsRef.current) {
                // Calculate the total offset needed
                const extraScroll = 200; // Adjust this value as needed
                const elementTop = resultsRef.current.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementTop - 0 + extraScroll;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100); // Delay to ensure the DOM updates before scrolling
    };

    const handleStartOver = () => {
        window.location.reload();
    };

    /*
    Added Search Component
    */ 
    return (
        <div className="App">
            <h1 className="main-header">Snap Market</h1>
            <div className="main-container">
                {!isMediaUploaded && ( 
                    <div className="content-container">
                        <MediaUpload onUploadComplete={handleMediaUploadComplete} />
                        <SearchComponent /> 
                    </div>
                )}
                {isMediaUploaded && (
                    <SnippingTool
                        videoContainerRef={videoContainerRef}
                        videoSource={videoSource}
                        onScreenshotComplete={handleScreenshotComplete} // Pass the handler
                    />
                )}
                {isMediaUploaded && (
                    <button className="start-over-button" onClick={handleStartOver}>Start Over</button>
                )}
            </div>
            {showResults && ( // Conditionally render based on showResults
                <div ref={resultsRef}> {/* Add the reference here */}
                    <h2 className="main-product-result">Your Main Product Result</h2>
                    <div className="image-and-cards-container">
                        <div className="image-container">
                            <ImageReveal src="/images/image1.png" alt="Static Image" />
                            <h2 className="other-products">Some Other Products You Might Be Interested In</h2>
                            <ProgressCards />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
