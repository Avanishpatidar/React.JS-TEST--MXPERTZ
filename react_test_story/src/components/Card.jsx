import React from 'react';
import '../styles/Card.css';

const Card = ({ title, image, description }) => {
  const imageUrl = Array.isArray(image) ? image[0] : image;
  
  return (
    <div className="card">
      <img 
        src={`https://ik.imagekit.io/dev24/${imageUrl}`}
        alt={title}
        onError={(e) => {
          e.target.src = 'fallback-image-url.jpg'; 
          console.log('Image failed to load:', imageUrl);
        }}
      />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;