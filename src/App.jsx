// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import testimonios from './data';
import Testimonial from './Components/Testimonial';
import Controls from './Components/Controls';
import './styles.css';

export default function App() {
  const [index, setIndex] = useState(0);
  const length = testimonios.length;
  const autoplayRef = useRef(null);

  const next = () => setIndex(prev => (prev + 1) % length);
  const prev = () => setIndex(prev => (prev - 1 + length) % length);
  const random = () => {
    let r = Math.floor(Math.random() * length);
    if (r === index) r = (r + 1) % length; // evitar mismo índice
    setIndex(r);
  };

  //autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setIndex(i => (i + 1) % length);
    }, 5000);
    return () => clearInterval(autoplayRef.current);
  }, [length]);

  const handleUserAction = (actionFn) => {
    clearInterval(autoplayRef.current);
    actionFn();

    autoplayRef.current = setInterval(() => {
      setIndex(i => (i + 1) % length);
    }, 5000);
  };

  //teclado
  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      handleUserAction(next);
    } else if (e.key === 'ArrowLeft') {
      handleUserAction(prev);
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);

  return (
    <main className="app">
      <h1 id='title'>Testimonios</h1>

      <div className="card-wrapper">
        <Testimonial item={testimonios[index]} />
      </div>

      <Controls
        onPrev={() => handleUserAction(prev)}
        onNext={() => handleUserAction(next)}
        onRandom={() => handleUserAction(random)}
      />

      <p className="counter">
        {index + 1} / {length}
      </p>
    </main>
  );
}
