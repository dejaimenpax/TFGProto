import React, { useState } from "react";
import StatsPage from "../StatsPage";
import GestionService from "../../../services/gestion.service";

const ListaUsuarios = ({
    searchTerm, 
    handleSearchTermChange, 
    deleteUser, 
    filterUsers, 
    handleCreateUserModalOpen, 
    handleResetPasswordModalOpen,
    handleResetPasswordModalClose,
    showResetPasswordModal,
    handlePasswordChange
  }) => {
  const [showStats, setShowStats] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const verStats = (user) => {
    if (!showStats) {
      GestionService.getListElement(user.username)
        .then((response) => {
          setSelectedUser(response.data);
          setShowStats(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setShowStats(false);
      setSelectedUser(null);
    }
  };

  const eraseStats = (user) => {
    console.log("Segun pulsas, el user es", user)
    const confirmed = window.confirm(
      `¿Estás seguro? Se borrarán los datos de ${user.username} sobre ejercicios resueltos, puntuaciones, etc.`
    );
    if (confirmed) {
      GestionService.eraseUserStats(user.username)
        .then((response) => {
          setShowMessage(true);
          setSelectedUser(user)
          setTimeout(() => {
            setShowMessage(false);
            setSelectedUser(null)
          }, 3000);
        })
        .catch((error) =>
          console.error("Error borrando las estadísticas:", error)
        );
    }
  };

  const cambiarPassword = (user) => {
    if (!showResetPasswordModal) {
      GestionService.getListElement(user.username)
        .then((response) => {
          setSelectedUser(response.data);
          handleResetPasswordModalOpen();
          handlePasswordChange(user.username)
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      handleResetPasswordModalClose();
      setSelectedUser(null);
      handlePasswordChange("")
    }
  }

  return (
    <div className="lista-usuarios">
      {showStats && selectedUser ? (
        <>
          <div className="stats-button">
            <button type="button" className="btn btn-custom" onClick={() => verStats(selectedUser)}>
              Volver
            </button>
          </div>
          <StatsPage user={selectedUser} />
        </>
      ) : (
        <>
          <h3 className="text-center mt-4">Gestión de usuarios</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <ul className="list-group">
          {filterUsers().map((user) => (
            <li key={user.id} className="list-group-item">
              <div className="user-details">
                <div className="user-username">{user.username}</div>
                <div className="user-role">
                  {user.roles[0].name === "teacher" ? "Profesor" : "Alumno"}
                </div>
              </div>
              <div className="button-container">
                <button
                  type="button"
                  className="btn btn-custom"
                  onClick={() => verStats(user)}
                >
                  Ver estadísticas
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => cambiarPassword(user)}
                >
                  Restablecer contraseña
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => eraseStats(user)}
                >
                  Resetear estadísticas
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteUser(user)}
                >
                  Eliminar usuario
                </button>
              </div>
            </li>
          ))}
          </ul>
        </>
      )}
      
      {!showStats && !selectedUser ? (
        <div className="button-special">
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={handleCreateUserModalOpen}
          >
            Crear nuevo usuario
          </button>
        </div>
      ) : (<></>)}
    </div>
  );
};

export default ListaUsuarios;