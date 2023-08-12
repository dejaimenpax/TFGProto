import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/auth/";

const checkTokenExpiration = () => {
  const loginTime = localStorage.getItem("loginTime");
  const currentTime = parseInt(Date.now());
  const elapsedMilliseconds = currentTime - parseInt(loginTime);

  const milisegundosEn24Horas = 24 * 60 * 60 * 1000;

  if (elapsedMilliseconds >= milisegundosEn24Horas) {
    // Ha pasado más de 24 horas, eliminar el usuario del local storage
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
  }
};



const register = (username, password, teacher, role) => {
  return axios.post(API_URL + "signup", {
    username,
    password,
    teacher,
    role,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("loginTime", Date.now())
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getCurrentUserFromDB = () => {
  const user = getCurrentUser();
  if (user && user.accessToken) {
    console.log("Entra al getCurrentuserFromDB")
    return axios.get(API_URL + "user", {
      headers: { "x-access-token": user.accessToken },
    });
  } else {
    return Promise.reject(new Error("User not found or token expired"));
  }
};

const getTeachers = () => {
  return axios.get(API_URL + "teachers");
}

const getMyStudents = () => {
  const user = getCurrentUser();
  if (user && user.accessToken) {
    return axios.get(API_URL + "students", {
      headers: { "x-access-token": user.accessToken },
    });
  } else {
    return Promise.reject(new Error("User not found or token expired"));
  }
}

const eraseStats = () => {
  const user = getCurrentUser();
  if (user && user.accessToken) {
    return axios.post(API_URL + "erase-stats", null, {
      headers: authHeader(),
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  } else {
    return Promise.reject(new Error("User not found or token expired"));
  }
};


const deleteAccountById = () => {
  const user = getCurrentUser();
  if (user && user.accessToken) {
    return axios.delete(API_URL + "delete-account-byid", {
      headers: authHeader(),
    })
    .then(() => {
      logout(); // Cerrar sesión después de borrar la cuenta
    })
    .catch((error) => {
      console.error("Error borrando la cuenta:", error);
      throw error;
    });
  } else {
    return Promise.reject(new Error("User not found or token expired"));
  }
};

const deleteAccountByUsername = (username) => {
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


const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUserFromDB,
  getTeachers,
  getMyStudents,
  checkTokenExpiration,
  eraseStats,
  deleteAccountById,
  deleteAccountByUsername,

};

export default AuthService;
