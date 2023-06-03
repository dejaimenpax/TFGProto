import axios from "axios";

const API_URL = "https://tfgjaimeback.fly.dev/api/exercise/";

const createExercise = (id_tema) => {
    return axios.post(API_URL + "create", { id_tema })
}

const resolveExercise = (exercise, input, email) => {
    return axios.post(API_URL + "resolve", { exercise, input, email })
}

const ExerciseService = {
    createExercise,
    resolveExercise
}

export default ExerciseService;