import React, { useState, useEffect, useRef} from "react";
import UserService from "../../services/user.service";
import ExerciseService from "../../services/exercise.service";
import EventBus from "../../common/EventBus";
import ExerciseCard from "./ExerciseCard";
import InputBox from "./InputBox";
import BlockButtons from "./BlockButtons";
import AuthService from "../../services/auth.service";

import '../../styles/Exercises/SelectTopic.css';

const SelectTopic = () => {
  const [content, setContent] = useState("");
  const [exerciseInput, setExerciseInput] = useState([]);
  const [exercise, setExercise] = useState(null);
  const [exerciseSelected, setExerciseSelected] = useState(false);
  const [exerciseResolved, setExerciseResolved] = useState(false);
  const [inputFilled, setInputFilled] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const [showForbiddenInput, setShowForbiddenInput] = useState(false);

  const exerciseCardRef = useRef(null);

  const handleSelect = (id_bloque) => {
    console.log("Entró en handleSelect con el id_bloque", id_bloque);
    ExerciseService.createExercise(id_bloque)
      .then((response) => {
        console.log("Lo que recibe como ejercicio es", response.data);

        // Check if the response is a string
        if (typeof response.data === 'string') {
          // If it's a string, set the exerciseSelected to false
          setExerciseSelected(false);
          setExercise(response.data); // Set the received string as the exercise
        } else {
          setExercise(response.data);
          setExerciseSelected(true);
          setExerciseInput(Array.from({ length: response.data.long_input }, () => ""));
          setExerciseResolved(false);
          setInputFilled(false);
        }
      })
      .catch((error) => console.error("Error creating exercise:", error));

      exerciseCardRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleInput = (input) => {
    if (!disableInput){
      if (input.every((value) => value !== "")) {
        const currentUser = AuthService.getCurrentUser();
        console.log("Lo que envia como ejercicio es", exercise);
        ExerciseService.resolveExercise(exercise, input, currentUser.username)
          .then((response) => {
            setExercise(response.data);
            setExerciseResolved(true);
            setInputFilled(false);
          })
          .catch((error) => console.error("Error resolving exercise:", error));
      } else {
        setInputFilled(true);
      }
    } else {
      setShowForbiddenInput(true);
      setTimeout(() => {
        setShowForbiddenInput(false); // Mantén el flag activo
      }, 3000);
    }
  };

  const handleInputChange = (value, index) => {
    const newExerciseInput = [...exerciseInput];
    newExerciseInput[index] = value;
    setExerciseInput(newExerciseInput);

    // Comprueba si algo del exerciseInput tiene caracteres que no sean cifras (incluye al value)
    let hasForbiddenCharacters = newExerciseInput.some(item => !/^\d+$/.test(item));
    setDisableInput(hasForbiddenCharacters);
    setShowForbiddenInput(hasForbiddenCharacters);
    setTimeout(() => {
      setShowForbiddenInput(false); // Mantén el flag activo
    }, 3000);
  };

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className= "container mb-4">
      <h3 className="text-center mb-4">Resolver ejercicios</h3>
      <p> </p>
      <BlockButtons handleSelect={handleSelect} />
      <p></p>
      {exerciseSelected && (
        <>
          {exercise.mensaje ? (
            <p className="text-center">
              {exercise.mensaje}
            </p>
          ) : (
            <>
              <div ref={exerciseCardRef}></div><ExerciseCard exercise={exercise}/>

              <div className="d-flex flex-column">
                {exerciseInput.map((value, index) => (
                  <div key={index} className="input-container d-flex flex-column">

                    <label className="input-label">
                      {exercise.etiquetas[index]}
                    </label>

                    <InputBox index={index} value={value} onChange={handleInputChange} />

                    {inputFilled && value === "" && (
                      <div className="input-error alert alert-danger mt-1 mb-1">
                        Introduce un valor
                      </div>
                    )}
                    
                    {exerciseResolved && ( 
                      exercise.explicacion[index].includes("<ol>") ? (
                        <div
                          className={`input-feedback alert ${exercise.explicacion[index].includes("!") ? "alert-success" : "alert-danger"}`}
                          dangerouslySetInnerHTML={{ __html: exercise.explicacion[index] }}
                        />
                      ) : (
                        <div
                          className={`input-feedback alert ${exercise.explicacion[index].includes("!") ? "alert-success" : "alert-danger"} text-center`}
                        >
                          {exercise.explicacion[index]}
                        </div>
                      )
                    )}


                  </div>
                ))}

                {showForbiddenInput && (
                  <div className="input-error alert alert-danger mt-1 mb-1">
                    Por favor, introduce solo números.
                  </div>
                )}
                
                {exerciseResolved ? (
                  <p className="text-center">Con este ejercicio has obtenido {exercise.nota} puntos.</p>
                ):<></>}

                {exerciseResolved ? (
                  <button className="btn btn-custom mt-2" onClick={() => handleSelect(parseInt(exercise.id_tema.toString()[0]))}>
                    Generar nuevo ejercicio del bloque
                  </button>
                ) : (
                  <button 
                    className="btn btn-custom mt-2" 
                    onClick={() => handleInput(exerciseInput)}
                  >
                    Resolver ejercicio
                  </button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SelectTopic;