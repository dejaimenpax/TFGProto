import React, { useState, useEffect } from "react";
import ExerciseService from "../../services/exercise.service";

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
    <div>
      <h1>Configurar Visibilidad de Ejercicios</h1>
      {Object.entries(groupedExercises).map(([block, blockExercises]) => (
        <div key={block}>
          <h3>Bloque {block}</h3>
          <div className="form-check">
            {blockExercises.map((exercise) => (
              <div key={exercise._id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={exercise.flag_active}
                  onChange={(e) => handleExerciseVisibilityChange(exercise._id, e.target.checked)}
                />
                <label className="form-check-label">{exercise.name}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSaveChanges} className="btn btn-primary">Guardar cambios</button>
    </div>
  );
};

export default ConfigureExercises;
