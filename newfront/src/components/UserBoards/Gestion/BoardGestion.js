import React, { useState, useEffect } from "react";
import AuthService from "../../../services/auth.service";
import GestionService from "../../../services/gestion.service";
import "../../../styles/UserBoards/BoardGestion.css";
import EventBus from "../../../common/EventBus";
import ListaUsuarios from "./ListaUsuarios";
import CrearUsuario from "./CrearUsuario";
import ModificarUsuario from "./ModificarUsuario";

import { decrypt, encrypt } from "../../../common/Encryption";
import { encryptionKey } from "../../../common/Config";

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
  const [showTeacherInput, setShowTeacherInput] = useState(false)
  const [generalErrorMessage, setGeneralErrorMessage] = useState()

  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [teacherCode, setTeacherCode] = useState("")
  const [teacherNotFoundError, setTeacherNotFoundError] = useState(false);

  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [successfulRegister, setSuccessfulRegister] = useState(false);

  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [successfulReset, setSuccessfulReset] = useState(false);

  

  useEffect(() => {

    setShowCreateUserModal(false);

    AuthService.getCurrentUserFromDB()
      .then((response) => {
        setUser(response.data);
        getUsersExceptAdmins(response.data.username);
        fetchTeachers(response.data.username);

        if (response.data.username===response.data.teacher){
          setNewUser({
            username: "",
            password: "",
            teacher: response.data.teacher,
            role: "user",
          })
        }

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
      setShowTeacherInput(false)
      :
      setShowTeacherInput(true)

    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });

  }

  const createUser = () => {

    setRegisterMessage("");
    setSuccessfulRegister(false);

    if (!newUser.username || (!newUser.role && user.teacher!==user.username) || !newUser.password || (!newUser.teacher && newUser.role==="user")){
      setGeneralErrorMessage("Recuerda rellenar todos los campos de manera correcta.")
      setTimeout(() => {
        setGeneralErrorMessage(null)
      }, 3000);
      return;
    } else {
      setGeneralErrorMessage(null)
    }

    if (usernameErrorMessage!=="" || passwordErrorMessage!=="")
      return;

    if (user.teacher===user.username){
      setNewUser({
        ...newUser,
        teacher: user.teacher,
        role: "user"
      })
      console.log("Ha detectado que es un profesor registrando y va a registrar a esto: ", newUser)
    } else if (!teachers.includes(decrypt(teacherCode, encryptionKey)) && newUser.role!=="teacher"){
      return;
    }

    AuthService.register(newUser.username, newUser.password, newUser.teacher === "" ? newUser.username : newUser.teacher, newUser.role)
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
            ...newUser,
            username: "",
            password: "",
            teacher: user.teacher,
            role: "user"
          })
          setTeacherCode("")

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
  
    // Divide la lista en profesores y alumnos
    const teachersAux = filteredUsers.filter((user) => user.roles[0].name === "teacher");
    const studentsAux = filteredUsers.filter((user) => user.roles[0].name !== "teacher");
  
    // Ordena alfabéticamente por username
    teachersAux.sort((a, b) => a.username.localeCompare(b.username));
    studentsAux.sort((a, b) => a.username.localeCompare(b.username));
  
    // Inicializa un array para la lista ordenada
    const sortedUsers = []

    if (teachersAux.length===0){ //si no hay profesores
      return studentsAux;
    }

    // Itera por cada profesor y sus alumnos

    let professorStudents = []
    for (const element of teachersAux) {
      sortedUsers.push(element);
      professorStudents = studentsAux.filter((student) => student.teacher === element.username);
      professorStudents.sort((a, b) => a.username.localeCompare(b.username));
      sortedUsers.push(...professorStudents);
    }
  
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

  const handlePasswordChange = (usname) => {
    setNewUser({
      username: usname,
      password: "",
      teacher: "",
      role: "",
    })
  }

  const onChangeTeacherCode = (e) => {
    const code = e.target.value; //coge el codigo introducido
    setTeacherCode(code)
    setNewUser({
      ...newUser,
      teacher: decrypt(code, encryptionKey), //desencripta ese codigo y obtiene el teachername
    })
    setTeacherNotFoundError(!teachers.includes(newUser.teacher))
  };

  const handleResetPasswordModalOpen = () => {
    setShowResetPasswordModal(true);
  };

  const handleResetPasswordModalClose = () => {
    setShowResetPasswordModal(false);
    setNewUser({
      username: "",
      password: "",
      teacher: "",
      role: "",
    })
  };

  const resetPassword = () => {

    setResetMessage("");
    setSuccessfulReset(false);

    if (!newUser.password){
      setGeneralErrorMessage("Recuerda escribir una contraseña.")
      return;
    } else {
      setGeneralErrorMessage(null)
    }
  
    GestionService.restorePassword(newUser.username, newUser.password)
      .then(
        (response) => {
          setResetMessage(response.data.message);
          setSuccessfulReset(true);
          // Mostrar la contraseña generada
          alert("Modificada la contraseña de " + newUser.username + ". La nueva contraseña es " + newUser.password + ". Cópiala para mandársela al usuario.");

          // Restablecer los campos del nuevo usuario
          setNewUser({
            ...newUser,
            password: "",
          });

        },
        (error) => {
          const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

          setResetMessage(resMessage);
          setSuccessfulReset(false);
        })
      .catch((error) => {
        console.error(error);
      });

      setTimeout(() => {
        setResetMessage("")
      }, 6000);

  }

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
                showTeacherInput={showTeacherInput}
                handleCreateUserModalClose={handleCreateUserModalClose}
                successfulRegister={successfulRegister}
                registerMessage={registerMessage}
                usernameErrorMessage={usernameErrorMessage}
                passwordErrorMessage={passwordErrorMessage}
                teacherCode={teacherCode}
                onChangeTeacherCode={onChangeTeacherCode}
                teacherNotFoundError={teacherNotFoundError}
              />
            </div>
          ) : showResetPasswordModal ? (
            <div className="board-gestion">
              <ModificarUsuario 
                newUser={newUser}
                handleNewUserChange={handleNewUserChange}
                passwordErrorMessage={passwordErrorMessage}
                handleResetPasswordModalClose={handleResetPasswordModalClose}
                resetPassword={resetPassword}
                successfulReset={successfulReset}
                resetMessage={resetMessage}
              />
            </div>
          ) : (
            <div className="board-gestion">
              <ListaUsuarios
                searchTerm={searchTerm}
                handleSearchTermChange={handleSearchTermChange}
                deleteUser={deleteUser}
                filterUsers={filterUsers}
                handleCreateUserModalOpen={handleCreateUserModalOpen}     
                handleResetPasswordModalOpen={handleResetPasswordModalOpen}
                handleResetPasswordModalClose={handleResetPasswordModalClose}
                showResetPasswordModal={showResetPasswordModal}
                handlePasswordChange={handlePasswordChange}
              />
            </div>
          )}
        </>
      ) : (
        <h3>{content}</h3>
      )}
    </>
  );

}

export default BoardGestion;