import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile/Profile";
import BoardUser from "./components/UserBoards/BoardUser";
import BoardTeacher from "./components/UserBoards/BoardTeacher";
import BoardGestion from "./components/UserBoards/BoardGestion";
import Resolver from "./components/Exercises/Resolver";
import EventBus from "./common/EventBus";

const App = () => {
  const [showTeacherBoard, setShowTeacherBoard] = useState(false);
  const [showGestionBoard, setShowGestionBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowTeacherBoard(user.roles.includes("ROLE_TEACHER"));
      setShowGestionBoard(user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_TEACHER"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowTeacherBoard(false);
    setShowGestionBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <Link to={"/"} className="navbar-brand">
          MatemAPI
        </Link>
        <div className="navbar-nav mr-auto">
          {showGestionBoard && (
            <li className="nav-item">
              <Link to={"/gestion"} className="nav-link">
                Gestión de usuarios
              </Link>
            </li>
          )}
          {showTeacherBoard && (
            <li className="nav-item">
              <Link to={"/teacher"} className="nav-link">
                Estadísticas de alumnos
              </Link>
            </li>
          )}
          {!showTeacherBoard && !showGestionBoard && currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                Mis estadísticas
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <div className="dropdown">
                <button
                  className="btn btn-info text-dark dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Área de {currentUser.username}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Link to={"/profile"} className="dropdown-item">
                    Mi perfil
                  </Link>
                  <Link to={"/login"} className="dropdown-item" onClick={logOut}>
                    Cerrar Sesión
                  </Link>
                </div>
              </div>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Iniciar Sesión
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Registrarse
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile logOut={logOut} />} />
          {showGestionBoard && <Route path="/gestion" element={<BoardGestion />} />}
          {showTeacherBoard && (
            <Route path="/teacher" element={<BoardTeacher />} />
          )}
          {!showTeacherBoard && !showGestionBoard && (
            <Route path="/user" element={<BoardUser />} />
          )}
          <Route path="/resolver" element={<Resolver />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
