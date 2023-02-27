import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import ExerciseService from "../services/exercise.service";
import EventBus from "../common/EventBus";

import ExerciseCard from "./ExerciseCard";

const SelectTopic = () => {
    const [content, setContent] = useState("");
    const [exerciseInput, setExerciseInput] = useState("");
    const [exercise, setExercise] = useState(null);
    const [exerciseSelected, setExerciseSelected] = useState(false);
    const [exerciseResolved, setExerciseResolved] =useState(false);
    //const [idTema, setIdTema] = useState(0)

    const handleSelect = (id_tema) => {
      ExerciseService.createExercise(id_tema)
        .then(response => {
          setExercise(response.data)
          setExerciseSelected(true)
        })
        .catch(error => console.error("Error creating exercise:", error))
    }

    const handleInput = (input) => {

      ExerciseService.resolveExercise(exercise, input)
      .then(response => {
        setExercise(response.data)
        setExerciseInput("");
        setExerciseResolved(true);
      })
      .catch(error => console.error("Error resolving exercise:", error))
    }

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
      
    return(<>
              <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Selecciona un bloque
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <button className="dropdown-item" onClick={() => handleSelect(1)}>Bloque I</button>
                      <button className="dropdown-item" onClick={() => handleSelect(2)}>Bloque II</button>
                      <button className="dropdown-item" onClick={() => handleSelect(3)}>Bloque III</button>
                      <button className="dropdown-item" onClick={() => handleSelect(4)}>Bloque IV</button>
                  </div>
              </div>
              {exerciseSelected && (
                <>
                  <ExerciseCard tema={exercise.tema} texto={exercise.texto} />
                  <input type="text" value={exerciseInput} onChange={e => setExerciseInput(e.target.value)} />
                  <button onClick={() => handleInput(exerciseInput)}>Resolver ejercicio</button>
                  {exerciseResolved && (
                    <>
                      <p>{exercise.respuesta}</p>
                    </>
                  )}
                </>
              )}
            </>
    )
}


export default SelectTopic
