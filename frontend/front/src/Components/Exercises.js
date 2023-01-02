import Exercise from "./Exercise";

const Exercises = ({ exercises, newFilter, eraseExercise}) => {
    //console.log('Ojo que ha llegado al', exercises[0].topic)
    return(
        exercises
            .filter(x => x.topic.toLowerCase().includes(`${newFilter}`))
            .map( y => <Exercise key={y.id} exercise={y} eraseExercise={eraseExercise} />)     
    )
}

export default Exercises
