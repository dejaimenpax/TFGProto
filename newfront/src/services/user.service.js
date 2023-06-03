import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://tfgjaimeback.fly.dev/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getTeacherBoard = () => {
  return axios.get(API_URL + "teacher", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getTeacherBoard,
}

export default UserService;
