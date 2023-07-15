import axios from "axios";


const API_URL = "/api/exercise/";

const createExercise = (id_bloque) => {
    console.log("Entra al createExercis")
    return axios.post(API_URL + "create", { id_bloque })
}

const resolveExercise = (exercise, input, username) => {
    return axios.post(API_URL + "resolve", { exercise, input, username })
}

const ExerciseService = {
    createExercise,
    resolveExercise
}

export default ExerciseService;