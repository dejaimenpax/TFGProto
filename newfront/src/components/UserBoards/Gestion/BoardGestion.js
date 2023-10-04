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
    username: "",
    password: "",
    teacher: "",
    role: "",
  });

  const [teachers, setTeachers] = useState([]);
  const [showTeacherSelector, setShowTeacherSelector] = useState(true)
  const [generalErrorMessage, setGeneralErrorMessage] = useState()

  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");



  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [successfulRegister, setSuccessfulRegister] = useState(false);
  

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
    const { name, value } = e.target;
  
    // Perform validation checks and set error messages
    if (name === 'username') {
      if (value.length < 6 || value.length > 40) {
        setUsernameErrorMessage('El nombre de usuario debe tener entre 6 y 40 caracteres.');
      } else {
        setUsernameErrorMessage('');
      }
    }
  
    if (name === 'password') {
      if (value.length < 6 || value.length > 40) {
        setPasswordErrorMessage('La contraseña debe tener entre 6 y 40 caracteres.');
      } else {
        setPasswordErrorMessage('');
      }
    }
  
    setNewUser({
      ...newUser,
      [name]: value
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

  const createUser = () => {

    setRegisterMessage("");
    setSuccessfulRegister(false);

    if (!newUser.username || !newUser.role || !newUser.password || (showTeacherSelector && !newUser.teacher)){
      setGeneralErrorMessage("Recuerda elegir nombre de usuario, contraseña y rol.")
      return;
    } else {
      setGeneralErrorMessage(null)
    }
  
    AuthService.register(newUser.username, newUser.password, newUser.teacher, newUser.role)
      .then(
        (response) => {
          setRegisterMessage(response.data.message);
          setSuccessfulRegister(true);

          // Mostrar la contraseña generada
          alert("Creado usuario " + newUser.username + " con contraseña " + newUser.password + ". Cópiala para mandársela al usuario.");
          // Actualizar la lista de usuarios después de crear uno
          getUsersExceptAdmins(user.username);
          //Asi como la de profes
          fetchTeachers(user.username);
          // Restablecer los campos del nuevo usuario
          setNewUser({
            username: "",
            password: "",
            teacher: "",
            role: "",
          });
          setShowTeacherSelector(true);

        },
        (error) => {
          const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

          setRegisterMessage(resMessage);
          setSuccessfulRegister(false);
        })
      .catch((error) => {
        console.error(error);
      });

      setTimeout(() => {
        setRegisterMessage("")
      }, 6000);

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
  

  const deleteUser = (us) => {
    let confirmMessage =
      "¿Estás seguro de borrar al usuario? Esta acción no se puede deshacer.";

    if (us.roles[0].name.includes("teacher")) {
      confirmMessage +=
        " Esta acción también eliminará a sus alumnos asociados.";
    }

    const confirmDelete = window.confirm(confirmMessage);

    if (confirmDelete) {
      GestionService.deleteAccountByUsername(us.username)
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
              handleRoleChange={handleRoleChange}
              teachers={teachers}
              generalErrorMessage={generalErrorMessage}
              createUser={createUser}
              showTeacherSelector={showTeacherSelector}
              handleCreateUserModalClose={handleCreateUserModalClose}
              successfulRegister={successfulRegister}
              registerMessage={registerMessage}
              usernameErrorMessage={usernameErrorMessage}
              passwordErrorMessage={passwordErrorMessage}
            />
          </div> )
          :
          (<div className="board-gestion">
            <ListaUsuarios
              searchTerm={searchTerm}
              handleSearchTermChange={handleSearchTermChange}
              deleteUser={deleteUser}
              filterUsers={filterUsers}
              handleCreateUserModalOpen={handleCreateUserModalOpen}
            />
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

