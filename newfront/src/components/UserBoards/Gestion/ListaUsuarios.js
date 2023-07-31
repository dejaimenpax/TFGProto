import React from "react";

const ListaUsuarios = ({ searchTerm, handleSearchTermChange, deleteUser, filterUsers }) => {


    return (
        <div className="lista-usuarios">
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
                    {
                      us.roles[0].name==="teacher" ?
                      "Profesor"
                      :
                      "Alumno"
                    }
                  </div>
                </div>
                <div className="delete-button">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteUser(us)}
                  >
                    Eliminar usuario
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

    );
};

export default ListaUsuarios;
