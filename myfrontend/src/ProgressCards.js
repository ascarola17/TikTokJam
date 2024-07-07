import React from 'react';
import './ProgressCards.css';

const ProgressCards = ({ products }) => {
  return (
    <div className="progress-cards-container">
      {products.map((product, index) => (
        <div className="progress-card" key={index}>
          <h3 className="progress-card-title">{product.title}</h3>
          <div className="progress-image-container">
            <img src={product.thumbnail} alt={product.title} className="progress-product-image" />
          </div>
          <p className="progress-product-price">{product.price}</p>
          <a href={product.link} className="progress-purchase-button">Purchase</a>
        </div>
      ))}
    </div>
  );
}

export default ProgressCards;
