import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/exercise/";

const createExercise = (id_bloque) => {
    console.log("Entra al createExercis")
    return axios.post(API_URL + "create", { id_bloque })
}

const resolveExercise = (exercise, input, username) => {
    return axios.post(API_URL + "resolve", { exercise, input, username })
}

const getAllExercises = () => {
    return axios.get(API_URL + "get-all", { headers: authHeader() })
}

const updateExercisesVisibility = (exercises) => {
    return axios.post(API_URL + "update-visibility", exercises, { headers: authHeader() });
};


const ExerciseService = {
    createExercise,
    resolveExercise,
    getAllExercises,
    updateExercisesVisibility
}

export default ExerciseService;