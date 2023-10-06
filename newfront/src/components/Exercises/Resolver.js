import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import AuthService from "../../services/auth.service";
import ConfigureExercises from "./ConfigureExercises"

import SelectTopic from "./SelectTopic";
import { Link } from "react-router-dom";

const Resolver = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    UserService.getPublicContent().then(
      () => {
        setUser(AuthService.getCurrentUser);
      },
      (error) => {
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
            <p className="text-center">
              Para poder resolver los ejercicios, debes acceder con tu cuenta
            </p>
            <div className="text-center justify-content-between ">
              <Link to="/login" className="btn btn-custom btn-lg">
                Iniciar Sesión
              </Link>
              &nbsp;&nbsp;&nbsp;
              <Link to="/register" className="btn btn-custom btn-lg">
                Registrarse
              </Link>
            </div>
          </>
        ) : (
          <>
            {user.roles.includes("ROLE_ADMIN") ? ( //Si es admin
              <ConfigureExercises className="text-center" />
            ) : ( //Si no lo es, nada
              <></>
            )}
              <p></p>
              <SelectTopic className="text-center" />

          </>
        )}
      </header>
    </div>
  );
};

export default Resolver;
