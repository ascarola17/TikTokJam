import React from 'react';
import MediaUpload from './MediaUpload';
import './App.css';
import HandleLink from './HandleLink';
import ImageReveal from './ImageReveal';
import ProgressCards from './ProgressCards';

function App() {
  return (
    <div className="App">
      <h1 className="main-header">TikTok Jam</h1>
      <div className="content-container">
        <MediaUpload />
        <HandleLink />
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

