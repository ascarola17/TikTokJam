import React, { useEffect, useState } from 'react';
import MediaUpload from './MediaUpload';
import axios from 'axios';
import './App.css';
import HandleLink from './HandleLink';


function App() {
   

    return (
        <div className="App">
            <h1>Tik Tok Jam</h1>
            <div className="content-container">
                <MediaUpload />
                <HandleLink />
                
            </div>
        </div>
        
        
    );
}

export default App;
