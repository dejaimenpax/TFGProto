import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";

import AuthService from "../../services/auth.service";

import SelectTopic from "./SelectTopic"


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
            <p>Para poder resolver ejercicios, debe <a className="link-primary" href="/login">iniciar sesión</a></p>

          </>
          ) : (
          <>
            <p>Esto aparece porque estas registrado</p>
            <SelectTopic />
          </>
          )
        }
        <p>Este texto aparece haya token o no.</p>
      </header>
    </div>
  );
};

export default Resolver;