import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import "../../styles/UserBoards/BoardAdmin.css";
import EventBus from "../../common/EventBus";

const BoardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    AuthService.getCurrentUserFromDB()
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });

    getAllUsersExceptAdmins();
  }, []);

  const getAllUsersExceptAdmins = () => {
    AuthService.getAllUsersExceptAdmins()
      .then((response) => {
        setUsers(response.data);
        console.log("El frontend ha recibido", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterUsers = () => {
    console.log("El frontal recibe así a los usuarios", users);
    return users.filter((results) =>
      results.email.includes(searchTerm.toLowerCase())
    );
  };

  const deleteUser = (user) => {
    let confirmMessage =
      "¿Estás seguro de borrar al usuario? Esta acción no se puede deshacer.";

    if (user.roles[0].name.includes("teacher")) {
      confirmMessage +=
        " Esta acción también eliminará a sus alumnos asociados.";
    }

    const confirmDelete = window.confirm(confirmMessage);

    if (confirmDelete) {
      AuthService.deleteAccountByEmail(user.email)
        .then(() => {
          // Actualizar la lista de usuarios después de borrar uno
          getAllUsersExceptAdmins();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {user ? (
        <div className="board-admin">
          <h3 className="text-center mt-4">Panel de administración</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <ul className="list-group">
            {filterUsers().map((user) => (
              <li key={user.id} className="list-group-item">
                <div className="user-details">
                  <div className="user-email">{user.email}</div>
                  <div className="user-role">
                    {
                      user.roles[0].name==="teacher" ?
                      "Profesor"
                      :
                      "Alumno"
                    }
                  </div>
                </div>
                <div className="delete-button">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteUser(user)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h3>{content}</h3>
      )}
    </>
  );
};

export default BoardAdmin;

