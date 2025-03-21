import React from 'react';
import './MainView.css';

function MainView({ mainSrc, photographerName, photographerUrl, images, selectedIndex, onSelect }) {
  return (
    <div className="main-view">
      <div className="photographer-info">
        <a href={photographerUrl} target="_blank" rel="noreferrer">
          {photographerName}
        </a>
      </div>
      <img src={mainSrc} alt="Main" className="main-image" />
      <div className="thumbnails">
        {images.map((img, idx) => (
          <img
            key={img.id}
            src={img.src.small}
            alt={`Thumbnail-${idx}`}
            className={`thumbnail ${selectedIndex === idx ? 'selected' : ''}`}
            onClick={() => onSelect(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default MainView;