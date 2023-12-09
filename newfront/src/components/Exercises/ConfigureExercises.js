import React, { useState, useEffect } from "react";
import ExerciseService from "../../services/exercise.service";
import "../../styles/Exercises/ConfigureExercises.css";

const ConfigureExercises = ( {user} ) => {
  const [exercises, setExercises] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
        setExercises(response.data);
        setShowSuccessMessage(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      })
      .catch((error) => console.error("Error actualizando la visibilidad de ejercicios:", error));
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

  const getBlockName = (block) => {
    switch (block.toString()) {
      case "1":
        return "Números y Operaciones";
      case "2":
        return "Unidades de Medida";
      case "3":
        return "Formas Geométricas";
      case "4":
        return "Gráficas y Estadística";
      default:
        return "";
    }
  };

  return (
    <>
      {user?.username!==user?.teacher && //si no es profesor
      (<div className="container">

        <h3 className="text-center">Configurar visibilidad de ejercicios</h3>
        <div className="row row-cols-md-2 row-cols-1">
          {Object.entries(groupedExercises).map(([block, blockExercises]) => (
            <div key={block} className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">Bloque {block}: {getBlockName(block)}</h5>
                  {blockExercises.map((exercise) => (
                    <div key={exercise._id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={exercise.flag_active}
                        onChange={(e) =>
                          handleExerciseVisibilityChange(exercise._id, e.target.checked)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`exercise-${exercise._id}`}
                      >
                        {exercise.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleSaveChanges} className="btn btn-custom btn-block">
          Guardar cambios
        </button>
        {showSuccessMessage && (
          <div className="alert alert-success text-center" role="alert">
            Se ha guardado la configuración de visibilidad de los ejercicios
          </div>
        )}
        <p> </p>

      </div>)}

      {user?.username===user?.teacher && //si es profesor
      (<div className="container">

        <h3 className="text-center">Ejercicios actualmente visibles</h3>
        <div className="row row-cols-md-2 row-cols-1">
          {Object.entries(groupedExercises).map(([block, blockExercises]) => (
            <div key={block} className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">Bloque {block}</h5>
                  {blockExercises.map((exercise) => (
                    <div key={exercise._id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={exercise.flag_active}
                        disabled={true}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`exercise-${exercise._id}`}
                      >
                        {exercise.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p> </p>

      </div>)}
    </>
  );
};

export default ConfigureExercises;
