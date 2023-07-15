import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/admin/";

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

const AdminService = {
  getAllUsersExceptAdmins,
  deleteAccountByUsername,
};

export default AdminService;
