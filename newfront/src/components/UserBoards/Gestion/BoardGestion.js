import React, { useState, useEffect } from "react";
import AuthService from "../../../services/auth.service";
import GestionService from "../../../services/gestion.service";
import "../../../styles/UserBoards/BoardGestion.css";
import EventBus from "../../../common/EventBus";
import ListaUsuarios from "./ListaUsuarios";
import CrearUsuario from "./CrearUsuario";

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

  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  

  useEffect(() => {
    AuthService.getCurrentUserFromDB()
      .then((response) => {
        setUser(response.data);
        getUsersExceptAdmins(response.data.username);
        fetchTeachers(response.data.username);
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
  }, []);

  const getUsersExceptAdmins = (username) => {
    GestionService.getUsersExceptAdmins(username)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchTeachers = (username) => {
    GestionService.getTeachers(username)
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
        getUsersExceptAdmins(user.username);
        //Asi como la de profes
        fetchTeachers(user.username);
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
    // Primero, filtramos por término de búsqueda
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Luego, ordenamos la lista por rol (Profesor primero, luego Alumno) y luego alfabéticamente por username
    const sortedUsers = filteredUsers.sort((a, b) => {
      // Ordenamos por rol (Profesor primero, luego Alumno)
      if (a.roles[0].name === "teacher" && b.roles[0].name !== "teacher") {
        return -1;
      } else if (a.roles[0].name !== "teacher" && b.roles[0].name === "teacher") {
        return 1;
      } else {
        // Si tienen el mismo rol, ordenamos alfabéticamente por username
        return a.username.localeCompare(b.username);
      }
    });
  
    return sortedUsers;
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
          getUsersExceptAdmins(user.username);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCreateUserModalOpen = () => {
    setShowCreateUserModal(true);
  };

  const handleCreateUserModalClose = () => {
    setShowCreateUserModal(false);
  };

  return (
    <>
      {user ? (
        <>
        {showCreateUserModal ? (
          <div className="board-gestion">
            <CrearUsuario
              user={user}
              newUser={newUser}
              handleNewUserChange={handleNewUserChange}
              usernameErrorMessage={usernameErrorMessage}
              handleShowUsername={handleShowUsername}
              showUsername={showUsername}
              handleRoleChange={handleRoleChange}
              teachers={teachers}
              generalErrorMessage={generalErrorMessage}
              createUser={createUser}
              showTeacherSelector={showTeacherSelector}
            />
            <div className="button-special">
              <button
                type="button"
                className="btn btn-danger btn-block"
                onClick={handleCreateUserModalClose}
              >
                Volver a gestión
              </button>
            </div>
          </div> )
          :
          (<div className="board-gestion">
            <ListaUsuarios
              searchTerm={searchTerm}
              handleSearchTermChange={handleSearchTermChange}
              deleteUser={deleteUser}
              filterUsers={filterUsers}
            />
            <div className="button-special">
              <button
                type="button"
                className="btn btn-success btn-block"
                onClick={handleCreateUserModalOpen}
              >
                Crear nuevo usuario
              </button>
            </div>
        </div>
        )}
        </>
      ) : (
        <h3>{content}</h3>
      )}
    </>
  );
  
};

export default BoardGestion;

