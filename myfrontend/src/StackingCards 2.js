// src/StackingCards.js
import React from 'react';
import './StackingCards.css';

function StackingCards() {
  const cards = [
    { id: 1, title: "Card One", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", image: "image1.png" },
    { id: 2, title: "Card Two", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", image: "image2.png" },
    { id: 3, title: "Card Three", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", image: "image3.png" },
    { id: 4, title: "Card Four", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", image: "image4.png" },
  ];

  return (
    <div id="cards">
      {cards.map((card, index) => (
        <div key={card.id} className="card" style={{ '--index': index + 1, '--reverse-index': cards.length - index }}>
          <div className="card__content">
            <div className="text">
              <h2>{card.title}</h2>
              <p>{card.text}</p>
              <button>Read more</button>
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
