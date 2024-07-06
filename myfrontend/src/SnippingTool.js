import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import axios from 'axios';

function SnippingTool({ videoContainerRef, videoSource, onScreenshotComplete }) {
    const [screenshot, setScreenshot] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selection, setSelection] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
    const [isScreenshotMode, setIsScreenshotMode] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [screenshotBlob, setScreenshotBlob] = useState(null);

    const startSelection = (e) => {
        if (!isScreenshotMode) return;
        setIsSelecting(true);
        setSelection({
            startX: e.clientX,
            startY: e.clientY,
            endX: e.clientX,
            endY: e.clientY,
        });
    };

    const updateSelection = (e) => {
        if (!isSelecting) return;
        setSelection((prev) => ({
            ...prev,
            endX: e.clientX,
            endY: e.clientY,
        }));
    };

    const endSelection = () => {
        setIsSelecting(false);
        setIsScreenshotMode(false);
        setIsConfirmVisible(true); // Show confirm button after selection
        captureSelection();
    };

    const captureSelection = () => {
        const containerElement = videoContainerRef.current;

        if (!containerElement) {
            console.error('Video container element not found');
            return;
        }

        const rect = containerElement.getBoundingClientRect();
        const { startX, startY, endX, endY } = selection;
        const x = Math.max(0, Math.min(startX, endX) - rect.left);
        const y = Math.max(0, Math.min(startY, endY) - rect.top);
        const width = Math.min(rect.width, Math.abs(endX - startX));
        const height = Math.min(rect.height, Math.abs(endY - startY));

        if (width === 0 || height === 0) {
            console.error('Invalid selection dimensions:', { width, height });
            return;
        }

        console.log('Selection coordinates:', { x, y, width, height });

        html2canvas(containerElement, {
            x,
            y,
            width,
            height,
        }).then((canvas) => {
            canvas.toBlob((blob) => {
                const file = new File([blob], 'screenshot.png', { type: 'image/png' });
                setScreenshot(URL.createObjectURL(file));
                setScreenshotBlob(blob); // Save the blob for later use
            }, 'image/png');
        }).catch((error) => {
            console.error('Screenshot capture failed', error);
        });
    };

    const sendScreenshotToBackend = (blob) => {
        const formData = new FormData();
        formData.append('image', new File([blob], 'screenshot.png', { type: 'image/png' }));  // Ensure key name matches backend

        // Log the FormData to ensure it contains the expected data
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        axios.post('http://localhost:8000/api/upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log('Image successfully sent to backend:', response.data);
        }).catch(error => {
            console.error('Error sending image to backend:', error);
        });
    };

    const confirmSelection = () => {
        if (screenshotBlob) {
            sendScreenshotToBackend(screenshotBlob);
            onScreenshotComplete(); // Call the onScreenshotComplete prop
        }
    };

    const initiateScreenshotMode = () => {
        setIsScreenshotMode(true);
    };

    return (
        <div className="snipping-tool-container">
            <div className="video-container" ref={videoContainerRef}>
                {videoSource && (
                    <video controls width="400">
                        <source src={videoSource} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>
            <div className="box-container">
                <div className="button-container">
                    <button className="screenshot-button" onClick={initiateScreenshotMode}>
                        Take Screenshot
                    </button>
                </div>
                {screenshot && (
                    <div className="screenshot-container">
                        <h2>Screenshot</h2>
                        <img src={screenshot} alt="Screenshot" />
                        {isConfirmVisible && (
                            <button className="confirm-button" onClick={confirmSelection}>
                                Confirm
                            </button>
                        )}
                    </div>
                )}
                {isScreenshotMode && (
                    <div
                        className="selection-overlay"
                        onMouseDown={startSelection}
                        onMouseMove={updateSelection}
                        onMouseUp={endSelection}
                    >
                        {isSelecting && (
                            <div
                                className="selection-box"
                                style={{
                                    left: Math.min(selection.startX, selection.endX),
                                    top: Math.min(selection.startY, selection.endY),
                                    width: Math.abs(selection.endX - selection.startX),
                                    height: Math.abs(selection.endY - selection.startY),
                                }}
                            ></div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SnippingTool;
