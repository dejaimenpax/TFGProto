import React from 'react';
import '../../styles/Exercises/ExerciseCard.css';
import { Bar } from 'react-chartjs-2';


const ExerciseCard = ({ exercise }) => {
  return ( 
    <>
      {exercise ? (
        <div className="exercise-card">
          <div className="exercise-card-title">{exercise.tema}</div>
          <div className="exercise-card-text">{exercise.texto}</div>
          {exercise.enunciado && exercise.enunciado.length > 0 && (
            <div className="exercise-card-enunciado">
              { exercise.id_tema !== 4.01 ? 
              
              
              (
                exercise.enunciado.map((enunciadoItem, index) => (
                <div key={index}>{enunciadoItem}</div>))

              ) 

              :

              (
                <Bar
                  data={{
                    labels: exercise.enunciado.map((d, i) => i + 18),
                    datasets: [
                      {
                        label: 'Edad',
                        data: exercise.enunciado,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                      },
                    ],
                  }}
                />

              )
              
              
        
              
              }
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

