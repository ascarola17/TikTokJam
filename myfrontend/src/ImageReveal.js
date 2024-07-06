import React, { useEffect, useRef } from 'react';
import './ImageReveal.css';

const ImageReveal = ({ src, alt }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if ('animate' in document.createElement('div') && 'ViewTimeline' in window) {
      const $card = cardRef.current;
      $card.animate(
        {
          opacity: [0, 1],
          clipPath: ['inset(45% 20% 45% 20%)', 'inset(0% 0% 0% 0%)'],
        },
        {
          fill: 'both',
          timeline: new window.ViewTimeline({
            subject: $card,
          }),
          rangeStart: 'entry 25%',
          rangeEnd: 'cover 50%',
        }
      );
    } else {
      console.warn('ViewTimeline API is not supported in this browser.');
    }
  }, []);
    /*
    Description: Getting image from the backend and displaying it in the main 
    container
    */
  return (
    <div className="image-reveal-container">
      <div className="image-reveal-card" ref={cardRef}>
        <div className="image-reveal-left">
          <h3 className="product-title">Product 1</h3>
          <button className="purchase-button">Purchase</button>
        </div>
        <div className="image-reveal-right">
          

          <img src={src} alt={alt} className="revealing-image" />
        </div>
      </div>
    </div>
  );
};

export default ImageReveal;
