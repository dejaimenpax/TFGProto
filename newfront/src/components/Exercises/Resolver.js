import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import AuthService from "../../services/auth.service";

import SelectTopic from "./SelectTopic"
import { Link } from "react-router-dom";


const Resolver = () => {
  const [content, setContent] = useState("");
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
        setUser(AuthService.getCurrentUser)
      },
      (error) => {
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
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        {!user ? (
          <>
            <p className="text-center">Para poder resolver los ejercicios, debes acceder con tu cuenta</p>
            <div className="text-center justify-content-between ">
              <Link to="/login" className=" btn btn-custom btn-lg">Iniciar Sesión</Link>
               &nbsp;&nbsp;&nbsp;
              <Link to="/register" className="btn btn-custom btn-lg">Registrarse</Link>
            </div>

          </>
          ) : (
          <>
            <p className="text-center">¡Entrena el tipo de ejercicios que quieras! Podrás elegir entre los distintos bloques del temario:</p>
            <SelectTopic className="text-center" />
          </>
          )
        }
      </header>
    </div>
  );
};

export default Resolver;