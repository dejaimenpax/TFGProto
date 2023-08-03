import React, { useState } from "react";
import StatsPage from "../StatsPage";
import GestionService from "../../../services/gestion.service";

const ListaUsuarios = ({ searchTerm, handleSearchTermChange, deleteUser, filterUsers }) => {
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

  return (
    <div className="lista-usuarios">
      {showStats && selectedUser ? (
        <>
          <div className="stats-button">
            <button type="button" className="btn btn-custom" onClick={() => verStats(selectedUser)}>
              Ocultar estadísticas
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
            {filterUsers().map((us) => (
              <li key={us.id} className="list-group-item">
                <div>
                  <div className="user-details">
                    <div className="user-username">{us.username}</div>
                    <div className="user-role">{us.roles[0].name === "teacher" ? "Profesor" : "Alumno"}</div>
                  </div>
                  <div className="button-container">
                    { us !== null && us===selectedUser && showMessage ?
                      (
                        <div className="alert alert-success text-center">
                          ¡Las estadísticas han sido borradas!
                        </div>
                      )
                      :
                      (
                        <>
                          <div className="stats-button">
                            <button type="button" className="btn btn-custom" onClick={() => verStats(us)}>
                              Ver estadísticas
                            </button>
                          </div>
                          <div className="stats-button">
                            <button type="button" className="btn btn-secondary" onClick={() => eraseStats(us)}>
                              Resetear estadísticas
                            </button>
                          </div>
                          <div className="stats-button">
                            <button type="button" className="btn btn-danger" onClick={() => deleteUser(us)}>
                              Eliminar usuario
                            </button>
                          </div>
                        </>
                      )
                    }
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ListaUsuarios;