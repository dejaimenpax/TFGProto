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

const getUsersExceptAdmins = (username) => {
  console.log("Entra al getUsersExceptAdmins")
  return axios.get(API_URL + "getUsersExceptAdmins", { 
    headers: authHeader(),
    params: { username }, // Send the username as a query parameter 
  });
};


const getListElement = (username) => {
  return axios.get(API_URL + "getListElement", {
    headers: authHeader(),
    params: { username }, // Send the username as a query parameter
  });
};

const getTeachers = (username) => {
  return axios.get(API_URL + "getTeachers", {
    headers: authHeader(),
    params: { username }, // Send the username as a query parameter
  });
}

const eraseUserStats = (username) => {
  return axios.post(API_URL + "eraseUserStats", {username} , {
    headers: authHeader()
  })
}

const updateRankingVisibility = (teacher, flag) => {
  return axios.post(API_URL + "updateRankingVisibility", {teacher, flag} , {
    headers: authHeader()
  })
}


const restorePassword = (username, password) => {
  return axios.post(API_URL + "restorePassword", {username, password} , {
    headers: authHeader()
  })
}

const GestionService = {
  getUsersExceptAdmins,
  deleteAccountByUsername,
  getListElement,
  eraseUserStats,
  getTeachers,
  restorePassword,
  updateRankingVisibility,
};

export default GestionService;
