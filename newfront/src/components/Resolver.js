import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import AuthService from "../services/auth.service";

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
            <p>Esto aparece porque no te has registrado.</p>
            <p>Para poder resolver ejercicios, debe iniciar sesión</p>
            <p><a className="btn btn-primary btn-lg" href="/login" role="button">Iniciar Sesión</a></p>

          </>
          ) : (
          <>
            <p>Esto aparece porque estas registrado</p>
            <h2>Aqui apareceran el boton y la generacion de ejercicios</h2>
          </>
          )
        }
        <p>Este texto aparece haya token o no.</p>
      </header>
    </div>
  );
};

export default Resolver;