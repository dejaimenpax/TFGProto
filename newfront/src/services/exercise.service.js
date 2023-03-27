import axios from "axios";

const API_URL = "http://localhost:8080/api/exercise/";

const createExercise = (id_tema) => {
    return axios.post(API_URL + "create", { id_tema })
}

const resolveExercise = (exercise, input) => {
    return axios.post(API_URL + "resolve", { exercise, input })
}

const ExerciseService = {
    createExercise,
    resolveExercise
}

export default ExerciseService;