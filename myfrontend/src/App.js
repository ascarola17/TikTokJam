import React, { useEffect, useState } from 'react';
import MediaUpload from './MediaUpload';
import axios from 'axios';
import './App.css';
import HandleLink from './HandleLink';

import ImageReveal from './ImageReveal';
import StackingCards from './StackingCards';

function App() {
   

    return (
        <div className="App">
            <h1 className="main-header">Tik Tok Jam</h1>
            <div className="content-container">
                <MediaUpload />
                <HandleLink />
                
            </div>
        <h2>Your Main Product Result</h2>
        <ImageReveal src="/images/image1.png" alt="Static Image" />
        <h2>Some Other Products You Might Be Interested In</h2>
      <StackingCards />
    </div>
    );
}

export default App;
