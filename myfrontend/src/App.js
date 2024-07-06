import React, { useState, useRef, useEffect } from 'react';
import MediaUpload from './MediaUpload';
import ImageReveal from './ImageReveal';
import ProgressCards from './ProgressCards';
import SnippingTool from './SnippingTool';
import './App.css';


function App() {
    const [isMediaUploaded, setIsMediaUploaded] = useState(false);
    const [videoSource, setVideoSource] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const videoContainerRef = useRef(null);
    const resultsRef = useRef(null); // Reference for the results section

    const [item, setItem] = useState(null);

    const handleMediaUploadComplete = (file) => { 
        setVideoSource(URL.createObjectURL(file));
        setIsMediaUploaded(true);
    };

    const handleScreenshotComplete = () => {
        setShowResults(true); // Show the results after screenshot
        setTimeout(() => {
            if (resultsRef.current) {
                // Calculate the total offset needed
                const extraScroll = 200;
                const elementTop = resultsRef.current.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementTop - 0 + extraScroll;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100); 
    };

    const handleStartOver = () => {
        window.location.reload();
    };

    const fetchProcessedData = async () => {
        try {
            const response = await fetch('http://localhost:8000/serpapi_search/');
            console.log(response)
            const data = await response.json();
            setItem(data.search_results[0]); // Get the first item
        } catch (error) {
            console.error('Error fetching processed data:', error);
        }
    };

    useEffect(() => {
        if (showResults) {
            fetchProcessedData(); // Fetch item data when showResults is true
        }
    }, [showResults]);


    return (
        <div className="App">
            <h1 className="main-header">SnapMarket</h1>
            <div className="main-container">
                {!isMediaUploaded && ( 
                    <div className="content-container">
                        <MediaUpload onUploadComplete={handleMediaUploadComplete} />
\                    </div>
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
                        {item ? (
                                <ImageReveal src={item.thumbnail} alt={item.title} />
                            ) : (
                                <p>Loading...</p>
                            )}
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
