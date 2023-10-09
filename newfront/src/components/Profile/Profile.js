import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import Username from "./Username";
import Roles from "./Roles";
import "../../styles/Profile/Profile.css";
import AuthService from "../../services/auth.service";

import { encrypt } from "../../common/Encryption";
import { encryptionKey } from "../../common/Config";

const Profile = ({ logOut }) => {
  const [content, setContent] = useState();
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent("Logged");
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
      <section className="profile-section text-center">
        <h2>Datos del perfil</h2>
        <div className="jumbotron">
          {content === "Logged" ? (
            <>
              <Username username={currentUser.username} />
              <Roles roles={currentUser.roles} />
              {currentUser.roles.includes("ROLE_TEACHER") &&
                <div className="profile-row">
                  <div className="text-center"><b>Código único de profesor: </b>{encrypt(currentUser.username, encryptionKey)}</div>
                </div>
              }
            </>
          ) : (
            <>{content}</>
          )}
        </div>
      </section>
      
      {/* Borrado en la feature/eliminarAutoborrado

      <section className="config-section text-center">
        <h2>Configuración</h2>
        {content === "Logged" ? (
          <>
            <button
              className="btn btn-custom btn-block"
              onClick={handleEraseStats}
            >
              Borrar Estadísticas
            </button>
            {showMessage && (
              <div className="input-feedback alert alert-success text-center">
                ¡Las estadísticas han sido borradas!
              </div>
            )}
            <button
              className="btn btn-danger btn-block"
              onClick={handleDeleteAccountById}
            >
              Borrar Cuenta
            </button>
          </>
        ) : (
          <>{content}</>
        )}
      </section>


      
      */}
    </div>
  );
};

export default Profile;
