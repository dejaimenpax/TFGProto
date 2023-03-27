import React from 'react';
import '../../styles/Exercises/ExerciseCard.css';

const ExerciseCard = ({ exercise }) => {
  return ( 
    <>
      {exercise ? (
        <div className="exercise-card">
          <div className="exercise-card-title">{exercise.tema}</div>
          <div className="exercise-card-text">{exercise.texto}</div>
          {exercise.enunciado && exercise.enunciado.length > 0 && (
            <div className="exercise-card-enunciado">
              {exercise.enunciado.map((enunciadoItem, index) => (
                <div key={index}>{enunciadoItem}</div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="exercise-card">
          <div className="exercise-card-title">No hay ejercicio</div>
          <div className="exercise-card-text">Por favor seleccione un ejercicio</div>
        </div>
      )}
    </>
  );
};

export default ExerciseCard;

