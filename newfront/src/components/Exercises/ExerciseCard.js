import React from 'react';
import '../../styles/Exercises/ExerciseCard.css';
import { Bar } from 'react-chartjs-2';
import TriangleExercise from './TriangleExercise';
import { CategoryScale, Chart, LinearScale, BarElement } from "chart.js";

Chart.register(CategoryScale);
Chart.register(LinearScale)
Chart.register(BarElement)


const ExerciseCard = ({ exercise }) => {
  let content;

  const options = {
    scales: {
      x: {
          title: {
            display: true,
            text: "Edades de los alumnos",
          } 
      },
      y: {
        title: {
          display: true,
          text: "Numero de alumnos",
        } 
    }
    }
  };
  
  switch (exercise?.id_tema) {
    case 3.02:
    case 3.05:
    case 3.06:
    case 3.09:
      content = <div className="triangle-exercise"><TriangleExercise enunciado={exercise.enunciado} perimetro_bool={false} /></div>
      break;
    case 3.15:
      content = <div className="triangle-exercise"><TriangleExercise enunciado={exercise.enunciado} perimetro_bool={true} /></div>
      break;
    case 4.01:
      content = (
        <Bar
          data={{
            labels: exercise.enunciado.map((d, i) => i + 18),
            datasets: [
              {
                label: 'Alumnos',
                data: exercise.enunciado,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                scaleType: 'category',
              },
            ],
          }}
          
          options={options}
        />
      );
      break;
    default:
      content = exercise?.enunciado?.map((enunciadoItem, index) => (
        <div key={index}>{enunciadoItem}</div>
      ));
  }

  return (
    <div className="exercise-card text-center">
      <div className="exercise-card-title">{exercise?.tema}</div>
      <div className="exercise-card-text">{exercise?.texto}</div>
      {exercise?.enunciado && exercise?.enunciado.length > 0 && (
        <>
          <div className="exercise-card-enunciado">
            {content}
          </div>
          <p className="puntos-explicados">{exercise.puntos_explicados}</p>
        </>
      )}
    </div>
  );
};

export default ExerciseCard;


