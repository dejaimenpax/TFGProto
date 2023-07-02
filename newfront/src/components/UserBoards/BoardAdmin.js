import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import "../../styles/UserBoards/BoardAdmin.css";
import EventBus from "../../common/EventBus";

const BoardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState();
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState({
    fullName: "",
    domain:"",
    email: "",
    password: "",
    teacher: "",
    role: "",
  });

  const [teachers, setTeachers] = useState([]);
  const [showEmail, setShowEmail] = useState(false);
  const [showTeacherSelector, setShowTeacherSelector] = useState(true)
  const [emailErrorMessage, setEmailErrorMessage] = useState()

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
    AuthService.getAllUsersExceptAdmins()
      .then((response) => {
        setUsers(response.data);
        console.log("El frontend ha recibido", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchTeachers = () => {
    AuthService.getTeachers()
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.log(error);
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

  const handleShowEmail = () => {
    if (newUser.fullName && newUser.domain && validateDomain(newUser.domain)) {
      setShowEmail(true);
    } else {
      setEmailErrorMessage("Por favor, introduce el nombre y un dominio correcto antes de mostrar el email generado.");
    }
  };

  const validateDomain = (domain) => {
    const resultado = (domain.endsWith(".es") || domain.endsWith(".com"))
    if (!resultado){
      setEmailErrorMessage("El dominio debe acabar en .es o .com (como en gmail.es o en yahoo.com).")
    }
    else{
      setEmailErrorMessage(null)
    }
    return resultado
  };

  const handleDomainChange = (e) => {
    setNewUser({
      ...newUser,
      domain: e.target.value
    });

    validateDomain(e.target.value);
  };

  

  const generateUsername = (fullName) => {
    // Lógica para generar el nombre de usuario
    const names = fullName.split(" ");
    const firstName = names[0].toLowerCase();
    const lastName = names[names.length - 1].toLowerCase();
    const username = firstName.substring(0, 3) + lastName.substring(0, 3) + (Math.floor(Math.random() * (90 - 10 + 1)) + 10).toString();
    return username;
  };

  const generateEmail = (username, domain) => {
    if (domain.endsWith(".es") || domain.endsWith(".com")) {
      return (username + '@' + domain);
    } else {
      // Mostrar un mensaje de error o manejarlo según tus necesidades
      console.error("Dominio inválido");
      return "";
    }
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
    const username = generateUsername(newUser.fullName);
    const email = generateEmail(username, newUser.domain);
    const password = generatePassword();
  
    AuthService.register(email, password, newUser.teacher, newUser.role)
      .then((response) => {
        // Mostrar la contraseña generada
        alert("Contraseña generada: " + password + ". Por favor, cópiela para mandársela al usuario.");
        // Actualizar la lista de usuarios después de crear uno
        getAllUsersExceptAdmins();
        // Restablecer los campos del nuevo usuario
        setNewUser({
          fullName: "",
          email: "",
          password: "",
          role: ""
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
          <div className="generate-credentials">
            <h4>Generar credenciales</h4>
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
            <div className="form-group">
              <label>Dominio:</label>
              <input
                type="text"
                className="form-control"
                name="domain"
                value={newUser.domain}
                onChange={handleDomainChange}
              />
            </div>
            <p className={emailErrorMessage ? "error-message" : "hide"}>
              {emailErrorMessage}
            </p>
            <button
              type="button"
              className="btn btn-custom"
              onClick={handleShowEmail}
            >
              Mostrar email generado
            </button>
            {showEmail && (
              <div className="form-group">
                <label>Email generado:</label>
                <input
                  type="text"
                  className="form-control"
                  value={generateEmail(generateUsername(newUser.fullName), newUser.domain)}
                  readOnly
                />
              </div>
            )}
            <div className="form-group">
              <label>Rol:</label>
              <select
                className="form-control"
                name="role"
                value={newUser.role}
                onChange={handleRoleChange}
              >
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
                {teachers.map((teacher, index) => (
                  <option key={index} value={teacher}>
                    {teacher}
                  </option>
                ))}
              </select>
            </div>
            )}
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

export default BoardAdmin;

