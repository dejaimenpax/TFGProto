import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/gestion/";

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};


const deleteAccountByUsername = (username) => {
  console.log("Entra al deleteAccountByUsername")
  const user = getCurrentUser();
  if (user && user.accessToken) {
    return axios
      .delete(API_URL + "delete-account-byUsername", {
        headers: authHeader(),
        data: { username },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error borrando la cuenta:", error);
        throw error;
      });
  } else {
    return Promise.reject(new Error("Usuario no encontrado o token expirado."));
  }
};

const getAllUsersExceptAdmins = () => {
  console.log("Entra al getAllUsersExceptAdmins")
  return axios.get(API_URL + "all-users", { headers: authHeader() });
};

const getStudentsForGestion = () => {
  console.log("Entra al getStudentsForGestion")
  return axios.get(API_URL + "students-for-gestion", { headers: authHeader() });
};

const getListElement = (username) => {
  console.log("Entra al getListElement Service");
  return axios.get(API_URL + "getListElement", {
    headers: authHeader(),
    params: { username }, // Send the username as a query parameter
  });
};

const GestionService = {
  getAllUsersExceptAdmins,
  deleteAccountByUsername,
  getStudentsForGestion,
  getListElement,
};

export default GestionService;
