// src/StackingCards.js
import React from 'react';
import './StackingCards.css';

function StackingCards() {
  const cards = [
    { id: 1, title: "Product 2", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", image: "image1.png" },
    { id: 2, title: "Product 3", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", image: "image2.png" },
    { id: 3, title: "Product 4", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", image: "image3.png" },
    { id: 4, title: "Product 5", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", image: "image4.png" },
  ];

  return (
    <div id="cards">
      {cards.map((card, index) => (
        <div key={card.id} className="card" style={{ '--index': index + 1, '--reverse-index': cards.length - index }}>
          <div className="card__content">
            <div className="text">
              <h2>{card.title}</h2>
              <p>{card.text}</p>
              <button>Buy Now</button>
            </div>
            <div className="image">
              <img src={`/images/${card.image}`} alt={card.title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StackingCards;
