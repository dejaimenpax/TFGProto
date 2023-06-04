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
  
  switch (exercise?.id_tema) {
    case 3.02:
    case 3.05:
    case 3.09:
    case 3.15:
      content = <TriangleExercise enunciado={exercise.enunciado} />
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
        />
      );
      break;
    default:
      content = exercise?.enunciado?.map((enunciadoItem, index) => (
        <div key={index}>{enunciadoItem}</div>
      ));
  }

  return (
    <div className="exercise-card">
      <div className="exercise-card-title">{exercise?.tema}</div>
      <div className="exercise-card-text">{exercise?.texto}</div>
      {exercise?.enunciado && exercise?.enunciado.length > 0 && (
        <div className="exercise-card-enunciado">{content}</div>
      )}
    </div>
  );
};

export default ExerciseCard;


