import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import ExerciseService from "../../services/exercise.service";
import EventBus from "../../common/EventBus";
import ExerciseCard from "./ExerciseCard";
import InputBox from "./InputBox"
import DropdownMenu from "./DropdownMenu"

import '../../styles/Exercises/SelectTopic.css';


const SelectTopic = () => {
  const [content, setContent] = useState("");
  const [exerciseInput, setExerciseInput] = useState(["", "", "", ""]);
  const [exercise, setExercise] = useState(null);
  const [exerciseSelected, setExerciseSelected] = useState(false);
  const [exerciseResolved, setExerciseResolved] = useState(false);
  const [inputFilled, setInputFilled] = useState(false);


  const handleSelect = (id_tema) => {
    ExerciseService.createExercise(id_tema)
      .then((response) => {
        setExercise(response.data);
        setExerciseSelected(true);
      })
      .catch((error) => console.error("Error creating exercise:", error));
  };

  const handleReset = (id_tema) => {
    setExerciseResolved(false);
    setInputFilled(false);
    setExerciseInput(["", "", "", ""]); // establecer el estado de exerciseInput a un nuevo array vacío
    handleSelect(Math.trunc(id_tema));
  };
  

  const handleInput = (input) => {
    if (input.every((value) => value !== "")) {
      ExerciseService.resolveExercise(exercise, input)
        .then((response) => {
          setExercise(response.data);
          setExerciseInput(["", "", "", ""]);
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
      <DropdownMenu handleSelect={handleSelect} />
  
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
                
                {exerciseResolved && (
                  <div className="input-feedback alert alert-primary">
                    {exercise.explicacion[index]}
                  </div>
                )}
                
              </div>
            ))}
            {exerciseResolved ? (
              <button onClick={() => handleReset(exercise.id_tema)}>
                Generar nuevo ejercicio del tema
              </button>
            ) : (
              <button onClick={() => handleInput(exerciseInput)}>
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


