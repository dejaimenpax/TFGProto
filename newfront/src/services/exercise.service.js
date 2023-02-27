import axios from "axios";

const API_URL = "http://localhost:8080/api/exercise/";

const createExercise = (idTema) => {
    return axios.post(API_URL + "create", { idTema })
}

const resolveExercise = (exercise, input) => {
    return axios.post(API_URL + "resolve", { exercise, input })
}

const ExerciseService = {
    createExercise,
    resolveExercise
}

export default ExerciseService;