
const Exercise = ({ exercise, eraseExercise }) => {
    return(
        <div>
            {exercise.topic} {exercise.content} Score: {exercise.score}
            <button onClick={() => eraseExercise(exercise)}>delete</button>
        </div>
    )
}

export default Exercise