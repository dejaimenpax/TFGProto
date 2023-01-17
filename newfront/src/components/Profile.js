import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          Perfil del usuario {currentUser.dni}
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Roles:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      <strong>Puntuaciones totales:</strong>
      <ul>
        {currentUser.scores.map((score, index) => <li key={index}>{score}</li>)}
      </ul>
      <strong>Ejercicios resueltos:</strong>
      <ul>
        {currentUser.counters.map((counter, index) => <li key={index}>{counter}</li>)}
      </ul>
      <strong>Puntuaciones medias:</strong>
      <ul>
        {currentUser.averages.map((average, index) => <li key={index}>{average}</li>)}
      </ul>

    </div>
  );
};

export default Profile;
