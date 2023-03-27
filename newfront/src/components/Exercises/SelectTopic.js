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

  const handleSelect = (id_tema) => {
    ExerciseService.createExercise(id_tema)
      .then((response) => {
        setExercise(response.data);
        setExerciseSelected(true);
      })
      .catch((error) => console.error("Error creating exercise:", error));
  };

  const handleInput = (input) => {
    ExerciseService.resolveExercise(exercise, input)
      .then((response) => {
        setExercise(response.data);
        setExerciseInput(["", "", "", ""]);
        setExerciseResolved(true);
      })
      .catch((error) => console.error("Error resolving exercise:", error));
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
        <ExerciseCard exercise={exercise}/>

        <div className="d-flex flex-column">
          {exerciseInput.map((value, index) => (
            <div key={index} className="input-container d-flex flex-column" >
              <InputBox
                index={index}
                value={value}
                onChange={handleInputChange}
              />
              <div className="input-feedback">
                {exercise && exercise.explicacion[index]}
              </div>
            </div>
          ))}
          <button onClick={() => handleInput(exerciseInput)}>
            Resolver ejercicio
          </button>
        </div>
        {/*exerciseResolved && (<p>holaaaaa{exercise.resultado}</p>)*/}
          
        </>
      )}
    </>
  )
}


export default SelectTopic


