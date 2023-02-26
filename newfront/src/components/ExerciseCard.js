import React from 'react';
import '../styles/ExerciseCard.css';

const ExerciseCard = ({ tema, texto }) => {
  return ( 
    <div className="exercise-card">
      <div className="exercise-card-title">{tema}</div>
      <div className="exercise-card-text">{texto}</div>
    </div>
  );
};

export default ExerciseCard;
