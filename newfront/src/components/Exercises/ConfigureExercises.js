import React, { useState, useEffect } from "react";
import ExerciseService from "../../services/exercise.service";
import '../../styles/Exercises/ConfigureExercises.css';

const ConfigureExercises = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    ExerciseService.getAllExercises()
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => console.error("Error loading exercises:", error));
  }, []);

  const handleExerciseVisibilityChange = (exerciseId, newVisibility) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise._id === exerciseId) {
        return { ...exercise, flag_active: newVisibility };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  const handleSaveChanges = () => {
    ExerciseService.updateExercisesVisibility(exercises)
      .then((response) => {
        // Optionally, update the 'exercises' state with the response from the backend
        setExercises(response.data);
      })
      .catch((error) => console.error("Error updating exercise visibility:", error));
  };

  // Group exercises by their block (id_tema)
  const groupedExercises = exercises.reduce((grouped, exercise) => {
    const block = exercise.id_tema.toString()[0];
    if (!grouped[block]) {
      grouped[block] = [];
    }
    grouped[block].push(exercise);
    return grouped;
  }, {});

  return (
    <div className="text-center"> {/* Centrar el contenido horizontalmente */}
      <h3>Configurar visibilidad de ejercicios</h3>
      <div className="container-columna">
        {Object.entries(groupedExercises).map(([block, blockExercises]) => (
          <div key={block} className="block-container"> {/* Agrega la clase 'block-container' para cada bloque */}
            <h3 className="text-center">Bloque {block}</h3> {/* Centrar el título horizontalmente */}
            {blockExercises.map((exercise) => (
              <div key={exercise._id} className="form-check mb-3"> {/* Añade la clase 'mb-3' para el margen inferior */}
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={exercise.flag_active}
                  onChange={(e) => handleExerciseVisibilityChange(exercise._id, e.target.checked)}
                />
                <label className="form-check-label" htmlFor={`exercise-${exercise._id}`}>{exercise.name}</label> {/* Usa 'htmlFor' para asociar el 'label' con el 'input' */}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p></p>
      <button onClick={handleSaveChanges} className="btn btn-custom btn-block">Guardar cambios</button> {/* Añade la clase 'btn-block' para que ocupe toda la anchura */}
    </div>
  );
};

export default ConfigureExercises;
