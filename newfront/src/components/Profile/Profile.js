import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import Email from "./Email";
import Roles from "./Roles";
import "../../styles/Profile/Profile.css";
import AuthService from "../../services/auth.service";

const Profile = ({logOut}) => {
  const [content, setContent] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();

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

  const handleEraseStats = () => {
    const confirmed = window.confirm(
      "¿Estás seguro? Se borrarán los ejercicios resueltos, puntuaciones, etc."
    );
    if (confirmed) {
      AuthService.eraseStats()
        .then(() => {
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 3000);
        })
        .catch((error) =>
          console.error("Error borrando las estadísticas:", error)
        );
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("¿Estás seguro? Esta acción no se puede deshacer.");
    if (confirmed) {
      AuthService.deleteAccount()
        .then(() => {
          logOut()
          navigate("/register")
        })
        .catch((error) => console.error("Error borrando la cuenta:", error));
    }
  };

  return (
    <div className="container">
      <section className="profile-section">
        <h2 className="text-center">Datos del perfil</h2>
        <header className="jumbotron">
          {content === "Logged" ? (
            <>
              <Email email={currentUser.email} />
              <Roles roles={currentUser.roles} />
            </>
          ) : (
            <>{content}</>
          )}
        </header>
      </section>

      <section className="config-section">
        <h2 className="text-center">Configuración</h2>
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
              onClick={handleDeleteAccount}
            >
              Borrar Cuenta
            </button>
          </>
        ) : (
          <>{content}</>
        )}
      </section>
    </div>
  );
};

export default Profile;
