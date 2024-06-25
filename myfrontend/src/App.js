import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ImageReveal from './ImageReveal';
import StackingCards from './StackingCards';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/items/')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the items!", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>TESTING THE THINGS</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}: {item.description}</li>
        ))}
      </ul>
      <div>
        <h2>Static Image with Animation</h2>
        <h2>Test Space Text</h2>
        <h2>Test Space Text</h2>
        <h2>Test Space Text</h2>
        <h2>Test Space Text</h2>
        <h2>Test Space Text</h2>
        <h2>Test Space Text</h2>
        <h2>Test Space Text</h2>
        <h2>Test Space Text</h2>
        <h2>Test Space Text</h2>
        <h2>Test Space Text</h2>
        <h2>Test Space Text</h2>
        <h2>Test Space Text</h2>
        <h2>Your Main Product Result</h2>
        <ImageReveal src="/images/image1.png" alt="Static Image" />
        <h2>Some Other Products You Might Be Interested In</h2>
      </div>
      <StackingCards />
      <h2>Test Space Text</h2>
      <h2>Test Space Text</h2>
      <h2>Test Space Text</h2>
      <h2>Test Space Text</h2>
      <h2>Test Space Text</h2>
      <h2>Test Space Text</h2>
      <h2>Test Space Text</h2>
    </div>
  );
}

export default App;
