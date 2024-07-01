import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import axios from 'axios';
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
    const { startX, startY, endX, endY } = selection;
    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);

    html2canvas(document.body, {
      x,
      y,
      width,
      height,
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png');
      setScreenshot(dataUrl);
      sendScreenshotToBackend(dataUrl);
    }).catch((error) => {
      console.error('Screenshot capture failed', error);
    });
  };

  const sendScreenshotToBackend = (dataUrl) => {
    axios.post('YOUR_BACKEND_ENDPOINT', { image: dataUrl })
      .then(response => {
        console.log('Image successfully sent to backend:', response.data);
      })
      .catch(error => {
        console.error('Error sending image to backend:', error);
      });
  };

  const initiateScreenshotMode = () => {
    setIsScreenshotMode(true);
  };

  return (
        <div className="App">
            <h1 className="main-header">TikTok Jam</h1>
            <div className="main-container">
        <div className="content-container">
                  <MediaUpload hidden={isLinkUploaded} onUploadComplete={handleMediaUploadComplete} />
                  <HandleLink onUploadComplete={handleLinkUploadComplete} />
              </div>
        <div className="screenshot-button-container">
          <button className="screenshot-button" onClick={initiateScreenshotMode}>
            Take Screenshot
          </button>
        </div>
      </div>
            <h2 className="main-product-result">Your Main Product Result</h2>
            <div className="image-and-cards-container">
        <div className="image-container">
          <ImageReveal src="/images/image1.png" alt="Static Image" />
                <h2 className="other-products">Some Other Products You Might Be Interested In</h2>
                        <ProgressCards />
              </div>
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
    );
}

export default App;
