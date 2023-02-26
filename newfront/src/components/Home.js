import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Link } from "react-router-dom";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
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
        <p>{content}</p>
        <div className="container">
          <h2 className="display-3">Bienvenido a MatemAPIcas</h2>
          <p>MatemAPIcas es una aplicación web para el correcto aprendizaje de ejercicios de matemáticas de nivel escolar &#40;tercer ciclo&#41;.</p>
          <p><Link to={"/resolver"} className="btn btn-primary btn-lg" >Comenzar &raquo;</Link></p>
        </div>
      </header>
    </div>
  );
};

export default Home;