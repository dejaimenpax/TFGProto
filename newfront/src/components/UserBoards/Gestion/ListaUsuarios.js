import React, { useState, useEffect } from "react";
import StatsPage from "../StatsPage";
import Username from "../../Profile/Username";
import GestionService from "../../../services/gestion.service";

const ListaUsuarios = ({ searchTerm, handleSearchTermChange, deleteUser, filterUsers }) => {
  const [showStats, setShowStats] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  return (
    <div className="lista-usuarios">
      {showStats && selectedUser ? ( // Mostrar solo StatsPage.js cuando showStats es true
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
                <div className="user-details">
                  <div className="user-username">{us.username}</div>
                  <div className="user-role">
                    {us.roles[0].name === "teacher" ? "Profesor" : "Alumno"}
                  </div>
                </div>

                <div className="stats-button">
                  <button type="button" className="btn btn-custom" onClick={() => verStats(us)}>
                    Ver estadísticas
                  </button>
                </div>

                <div className="stats-button">
                  <button type="button" className="btn btn-danger" onClick={() => deleteUser(us)}>
                    Eliminar usuario
                  </button>
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
