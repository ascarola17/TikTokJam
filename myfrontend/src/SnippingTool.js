import React, { useState } from 'react';
import html2canvas from 'html2canvas';

function SnippingTool({ videoContainerRef, videoSource }) {
    const [screenshot, setScreenshot] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selection, setSelection] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
    const [isScreenshotMode, setIsScreenshotMode] = useState(false);

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
        const x = Math.max(rect.left, Math.min(startX, endX)) - rect.left;
        const y = Math.max(rect.top, Math.min(startY, endY)) - rect.top;
        const width = Math.min(rect.width, Math.abs(endX - startX));
        const height = Math.min(rect.height, Math.abs(endY - startY));

        if (width === 0 || height === 0) {
            console.error('Invalid selection dimensions:', { width, height });
            return;
        }

        html2canvas(containerElement, {
            x,
            y,
            width,
            height,
            logging: true,
            useCORS: true,
        }).then((canvas) => {
            const dataUrl = canvas.toDataURL('image/png');
            setScreenshot(dataUrl);
        }).catch((error) => {
            console.error('Screenshot capture failed', error);
        });
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
