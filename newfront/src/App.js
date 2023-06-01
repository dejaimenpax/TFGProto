import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile/Profile";
import BoardUser from "./components/BoardUser";
import BoardTeacher from "./components/BoardTeacher";
import Resolver from "./components/Exercises/Resolver";
import EventBus from "./common/EventBus";

const App = () => {
  const [showTeacherBoard, setShowTeacherBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowTeacherBoard(user.roles.includes("ROLE_TEACHER"));
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
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <Link to={"/"} className="navbar-brand">
          MatemAPIcas
        </Link>
        <div className="navbar-nav mr-auto">
          {showTeacherBoard && (
            <li className="nav-item">
              <Link to={"/teacher"} className="nav-link">
                Panel de profesor
              </Link>
            </li>
          )}
          {!showTeacherBoard && currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                Panel de alumno
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
                  Área de {currentUser.email}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Link to={"/profile"} className="dropdown-item">
                    Mi perfil
                  </Link>
                  <a href="/login" className="dropdown-item" onClick={logOut}>
                    Cerrar Sesión
                  </a>
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/teacher" element={<BoardTeacher />} />
          <Route path="/resolver" element={<Resolver />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
