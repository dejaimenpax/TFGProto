import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import Ej6 from '../Clases_back/Bloque1/Ej6'
import ExerciseCard from "./ExerciseCard";

const SelectTopic = () => {
    const [content, setContent] = useState("");
    const [exerciseInput, setExerciseInput] = useState("");
    const [exercise, setExercise] = useState(null);
    const [exerciseSelected, setExerciseSelected] = useState(false);

  const handleSelect = (option) => {
    switch (option) {
      case 1: 
        setExercise(new Ej6(
          'Redondea los números siguientes a las decenas, centenas, millares y unidades de millar:',
          '987336 222452',
          40
        ))
        break
      case 2: 
        setExercise(new Ej6(
          'Redondea los números siguientes a las decenas, centenas, millares y unidades de millar:',
          '987336 222452',
          40
        ))
        break
      case 3: 
        setExercise(new Ej6(
          'Redondea los números siguientes a las decenas, centenas, millares y unidades de millar:',
          '987336 222452',
          40
        ))
        break
      case 4: 
        setExercise(new Ej6(
          'Redondea los números siguientes a las decenas, centenas, millares y unidades de millar:',
          '987336 222452',
          40
        ))
        break
      default:
        console.log("error en el switch del selector de ejercicios")
    }
    setExerciseSelected(true);
  }

    const handleInput = (input) => {
      setExercise(exercise.resolver(exerciseInput))
      setExerciseInput("")
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
                    <ExerciseCard tema={exercise.getTema()} texto={exercise.getTexto()} />
                    <input type="text" value={exerciseInput} onChange={e => setExerciseInput(e.target.value)} />
                    <button onClick={() => handleInput(exerciseInput)}>Resolver ejercicio</button>
                  </>
                )}
            </>
    )
}


export default SelectTopic
