import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import GestionService from "../../services/gestion.service";
import "../../styles/UserBoards/BoardGestion.css";
import EventBus from "../../common/EventBus";

const BoardGestion = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState();
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState({
    fullName: "",
    username: "",
    teacher: "",
    role: "",
  });

  const [teachers, setTeachers] = useState([]);
  const [showUsername, setShowUsername] = useState(false);
  const [showTeacherSelector, setShowTeacherSelector] = useState(true)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState()
  const [generalErrorMessage, setGeneralErrorMessage] = useState()

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
    fetchTeachers();
  }, []);

  const getAllUsersExceptAdmins = () => {
    GestionService.getAllUsersExceptAdmins()
      .then((response) => {
        setUsers(response.data);

      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchTeachers = () => {
    AuthService.getTeachers()
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNewUserChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleChange = (e) => {
    e.target.value==="teacher" ?
      setShowTeacherSelector(false)
      :
      setShowTeacherSelector(true)

    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });

  }

  const handleShowUsername = () => {
    if (newUser.fullName) {
      setUsernameErrorMessage(null);
      setNewUser({
        ...newUser,
        username: generateUsername(newUser.fullName)
      });
      setShowUsername(true);
    } else {
      setUsernameErrorMessage("Por favor, introduce nombre y apellidos para poder generar un nombre de usuario.");
      setShowUsername(false)
    }
  };

  const generateUsername = (fullName) => {
    // Lógica para generar el nombre de usuario
    const names = fullName.split(" ");
    const firstName = names[0].toLowerCase();
    const lastName = names[names.length - 1].toLowerCase();
    let username = firstName.substring(0, 3) + lastName.substring(0, 3) + (Math.floor(Math.random() * (90 - 10 + 1)) + 10).toString();
    while (users.map(x => x.username).includes(username)) {
      username = firstName.substring(0, 3) + lastName.substring(0, 3) + (Math.floor(Math.random() * (90 - 10 + 1)) + 10).toString();
    }
    return username;
  };

  const generatePassword = () => {
    // Lógica para generar una contraseña aleatoria
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  };
  
  const createUser = () => {
    if (!newUser.username || !newUser.role || (showTeacherSelector && !newUser.teacher)){
      setGeneralErrorMessage("Recuerda generar un nombre de usuario y elegir rol correctamente.")
      return;
    } else {
      setGeneralErrorMessage(null)
    }
    const password = generatePassword();
  
    AuthService.register(newUser.username, password, newUser.teacher, newUser.role)
      .then((response) => {
        // Mostrar la contraseña generada
        alert("Contraseña generada: " + password + ". Por favor, cópiela para mandársela al usuario.");
        // Actualizar la lista de usuarios después de crear uno
        getAllUsersExceptAdmins();
        //Asi como la de profes
        fetchTeachers();
        // Restablecer los campos del nuevo usuario
        setNewUser({
          fullName: "",
          username: "",
          teacher: "",
          role: "",
        });
        setShowTeacherSelector(true);
        setShowUsername(false)
      })
      .catch((error) => {
        console.error(error);
      });

  };

  const filterUsers = () => {
    return users.filter((results) => results.username.includes(searchTerm.toLowerCase())) 
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
      GestionService.deleteAccountByUsername(user.username)
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
        <div className="board-gestion">
          <h3 className="text-center mt-4">Gestión de usuarios</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <ul className="list-group">
            {filterUsers().map((us) => (
              <li key={us.id} className="list-group-item">
                <div className="user-details">
                  <div className="user-username">{us.username}</div>
                  <div className="user-role">
                    {
                      us.roles[0].name==="teacher" ?
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
                    onClick={() => deleteUser(us)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="generate-credentials">
            <h4>Crear nuevo usuario</h4>
            <div className="form-group">
              <label>Nombre y apellidos:</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={newUser.fullName}
                onChange={handleNewUserChange}
              />
            </div>
            <p className={usernameErrorMessage ? "alert alert-danger" : "hide"}>
              {usernameErrorMessage}
            </p>
            <button
              type="button"
              className="btn btn-custom"
              onClick={handleShowUsername}
            >
              Generar nombre
            </button>
            {showUsername && (<div className={showUsername ? "form form-group" : "hide"}>
              <label>Nombre de usuario generado:</label>
              <input
                type="text"
                className="form-control"
                value={newUser.username}
                readOnly
              />
            </div>)}
            <div className="form-group">
              <label>Rol:</label>
              <select
                className="form-control"
                name="role"
                value={newUser.role}
                onChange={handleRoleChange}
              >
                <option value="" disabled selected>
                  Selecciona una opción...
                </option>
                <option value="user">Alumno</option>
                <option value="teacher">Profesor</option>
              </select>
            </div>
            {showTeacherSelector && (
            <div className="form-group">
              <label>Profesor asociado:</label>
              <select
                className="form-control"
                name="teacher"
                value={newUser.teacher}
                onChange={handleNewUserChange}
              >
                  <option value="" disabled selected>
                    Selecciona una opción...
                  </option>
                {teachers.map((teacher, index) => (
                  <option key={index} value={teacher}>
                    {teacher}
                  </option>
                ))}
              </select>
            </div>
            )}
            <p className={generalErrorMessage ? "alert alert-danger" : "hide"}>
              {generalErrorMessage}
            </p>
            <button
              type="button"
              className="btn btn-custom"
              onClick={createUser}
            >
              Crear usuario
            </button>
          </div>
        </div>
      ) : (
        <h3>{content}</h3>
      )}
    </>
  );
};

export default BoardGestion;

