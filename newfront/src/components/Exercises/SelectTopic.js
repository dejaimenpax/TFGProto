import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import ExerciseService from "../../services/exercise.service";
import EventBus from "../../common/EventBus";
import ExerciseCard from "./ExerciseCard";
import InputBox from "./InputBox"
import BlockButtons from "./BlockButtons"
import AuthService from "../../services/auth.service";

import '../../styles/Exercises/SelectTopic.css';

const SelectTopic = () => {
  const [content, setContent] = useState("");
  const [exerciseInput, setExerciseInput] = useState([]);
  const [exercise, setExercise] = useState(null);
  const [exerciseSelected, setExerciseSelected] = useState(false);
  const [exerciseResolved, setExerciseResolved] = useState(false);
  const [inputFilled, setInputFilled] = useState(false);

  const handleSelect = (id_bloque) => {
    console.log("Entró en handleSelect con el id_bloque", id_bloque)
    ExerciseService.createExercise(id_bloque)
      .then((response) => {
        console.log("Lo que recibe como ejercicio es", exercise)
        setExercise(response.data);
        setExerciseSelected(true);
        setExerciseInput(Array.from({ length: response.data.long_input }, () => ""));
        setExerciseResolved(false);
        setInputFilled(false);
      })
      .catch((error) => console.error("Error creating exercise:", error));
  };

  const handleInput = (input) => {
    if (input.every((value) => value !== "")) {
      const currentUser = AuthService.getCurrentUser();
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
  };

  const handleInputChange = (value, index) => {
    const newExerciseInput = [...exerciseInput];
    newExerciseInput[index] = value;
    setExerciseInput(newExerciseInput);
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
    <>
      <BlockButtons handleSelect={handleSelect} />
      <p></p>
      {exerciseSelected && (
        <>
          <ExerciseCard exercise={exercise} />
  
          <div className="d-flex flex-column">
            {exerciseInput.map((value, index) => (
              <div key={index} className="input-container d-flex flex-column">
                <InputBox index={index} value={value} onChange={handleInputChange} />
  
                {inputFilled && value === "" && (
                  <div className="input-error alert alert-danger mt-1 mb-1">
                    Introduce un valor
                  </div>
                )}
  
                {exerciseResolved && (exercise.explicacion[index].includes("!") 
                  ? <div className="input-feedback alert alert-success text-center">
                      {exercise.explicacion[index]}
                    </div>
                  : <div className="input-feedback alert alert-danger text-center">
                      {exercise.explicacion[index]}
                    </div>
                )}
  
              </div>
            ))}
            
            {exerciseResolved ? (
              <button className="btn btn-custom" onClick={() => handleSelect(parseInt(exercise.id_tema.toString()[0]))}>
                Generar nuevo ejercicio del bloque
              </button>
            ) : (
              <button className="btn btn-custom" onClick={() => handleInput(exerciseInput)}>
                Resolver ejercicio
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
  

}


export default SelectTopic


