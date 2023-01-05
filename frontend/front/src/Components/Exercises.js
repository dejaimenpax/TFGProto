import Exercise from "./Exercise.js";

const Exercises = ({ exercises, newFilter, addInput, newInput, handleInputChange }) => {
    //console.log('Ojo que ha llegado al', exercises[0].topic)
    return(
        exercises
            .filter(x => x.tema.toLowerCase().includes(`${newFilter}`))
            .map( y => <Exercise key={y.id} exercise={y} 
                                addInput={addInput} newInput={newInput} 
                                handleInputChange={handleInputChange}/>)     
    )
}

export default Exercises
