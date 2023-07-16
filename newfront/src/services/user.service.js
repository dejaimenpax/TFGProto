import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getTeacherBoard = () => {
  return axios.get(API_URL + "teacher", { headers: authHeader() });
};

const getGestionBoard = () => {
  return axios.get(API_URL + "gestion", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getTeacherBoard,
  getGestionBoard,
}

export default UserService;
