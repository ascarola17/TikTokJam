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
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // New loading state
    const videoContainerRef = useRef(null);
    const resultsRef = useRef(null); // Reference for the results section

    const handleMediaUploadComplete = (file) => { 
        setVideoSource(URL.createObjectURL(file));
        setIsMediaUploaded(true);
    };

    const handleScreenshotComplete = () => {
        setShowResults(true); // Show the results after screenshot
        setIsLoading(true); 
    };

    const handleProcessComplete = (data) => {
        setProducts(data.search_results); 
        setIsLoading(false); 
    };

    const handleStartOver = () => {
        window.location.reload();
    };

    useEffect(() => {
        if (showResults && !isLoading) {
            setTimeout(() => {
                if (resultsRef.current) {
                    const extraScroll = 300;
                    const elementTop = resultsRef.current.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementTop - 0 + extraScroll;

                    setTimeout(() => {
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }, 500); 
                }
            }, 500); 
        }
    }, [showResults, isLoading]);

    return (
        <div className="App">
            <h1 className="main-header">SnapMarket</h1>
            <div className="main-container">
                {!isMediaUploaded && ( 
                    <div className="content-container">
                        <MediaUpload onUploadComplete={handleMediaUploadComplete} />
                    </div>
                )}
                {isMediaUploaded && (
                    <SnippingTool
                        videoContainerRef={videoContainerRef}
                        videoSource={videoSource}
                        onScreenshotComplete={handleScreenshotComplete} // Pass the handler
                        onProcessComplete={handleProcessComplete} // Pass the process complete handler
                    />
                )}
                {isMediaUploaded && (
                    <button className="start-over-button" onClick={handleStartOver}>Start Over</button>
                )}
            </div>
            {showResults && products.length > 0 && ( 
                <div ref={resultsRef}> {/* Add the reference here */}
                    <h2 className="main-product-result">Your Main Product Result</h2>
                    <div className="image-and-cards-container">
                        <div className="image-container">
                            <ImageReveal
                                src={products[0].thumbnail}
                                alt={products[0].title}
                                title={products[0].title}
                                price={products[0].price}
                                link={products[0].link}
                            />
                            <h2 className="other-products">Some Other Products You Might Be Interested In</h2>
                            <ProgressCards products={products.slice(1, 5)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
