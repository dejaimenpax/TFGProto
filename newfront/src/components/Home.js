import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/matemapi_logo.png";
import "../styles/Home.css";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

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
        <div className="container text-center">
          <img src={logo} alt="Logo" className="mb-4"/>
          <h2 className="display-4">Bienvenido a MatemAPI</h2>
          <p className="lead">MatemAPI es una app web para el correcto aprendizaje de ejercicios de matemáticas de nivel escolar (tercer ciclo).</p>
          <p>
            <Link to={"/resolver"} className="btn btn-custom btn-lg">Comenzar &raquo;</Link>
          </p>
        </div>
      </header>
    </div>
  );
};

export default Home;
