import axios from "axios";

const API_URL = "/api/auth/";

const checkTokenExpiration = () => {
  const loginTime = localStorage.getItem("loginTime");
  const currentTime = Date.now();
  const elapsedMilliseconds = currentTime - parseInt(loginTime);

  const elapsedHours = elapsedMilliseconds / (1000 * 60 * 60);

  if (elapsedHours >= 24) {
    // Ha pasado más de 24 horas, eliminar el usuario del local storage
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
  }
};



const register = (email, password, teacher, role) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
    teacher,
    role,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
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
      headers: { "x-access-token": user.accessToken },
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
      headers: { "x-access-token": user.accessToken },
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
};

export default AuthService;
