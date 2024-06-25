import React, { useEffect, useRef } from 'react';
import './ImageReveal.css';

const ImageReveal = ({ src, alt }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    if ('animate' in document.createElement('div') && 'ViewTimeline' in window) {
      const $image = imageRef.current;
      $image.animate(
        {
          opacity: [0, 1],
          clipPath: ['inset(45% 20% 45% 20%)', 'inset(0% 0% 0% 0%)'],
        },
        {
          fill: 'both',
          timeline: new window.ViewTimeline({
            subject: $image,
          }),
          rangeStart: 'entry 25%',
          rangeEnd: 'cover 50%',
        }
      );
    } else {
      console.warn('ViewTimeline API is not supported in this browser.');
    }
  }, []);

  return <img src={src} alt={alt} className="revealing-image" ref={imageRef} />;
};

export default ImageReveal;

