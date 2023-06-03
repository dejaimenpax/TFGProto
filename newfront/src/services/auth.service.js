import axios from "axios";

const API_URL = "https://tfgjaimeback.fly.dev/api/auth/";

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

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUserFromDB,
  getTeachers,
  getMyStudents,
};

export default AuthService;
