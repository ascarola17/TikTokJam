import React from 'react';
import './ProgressCards.css';

const ProgressCards = () => {
  return (
    <div className="container">
      <div className="card">
        <h3 className="title">Product 2</h3>
        <button className>Purchase</button>
      </div>
      <div className="card">
        <h3 className="title">Product 3</h3>
        <button className>Purchase</button>
      </div>
      <div className="card">
        <h3 className="title">Product 4</h3>
        <button className>Purchase</button>
      </div>
      <div className="card">
        <h3 className="title">Product 5</h3>
        <button className>Purchase</button>
      </div>
    </div>
  );
}

export default ProgressCards;

