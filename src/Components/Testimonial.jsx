// src/Components/Testimonial.jsx
import React, { useEffect, useState } from 'react';

export default function Testimonial({ item }) {
  const { nombre, cargo, texto, foto } = item;
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    setSlideIn(false);
    const timer = setTimeout(() => setSlideIn(true), 500);
    return () => clearTimeout(timer);
  }, [item]);

  return (
    <article className={`testimonial-card ${slideIn ? 'slide-in' : ''}`}>
      <img src={foto} alt={nombre} className="testimonial-photo" />
      <h3 className="testimonial-name">{nombre}</h3>
      <p className="testimonial-role">{cargo}</p>
      <p className="testimonial-text">{texto}</p>
    </article>
  );
}
