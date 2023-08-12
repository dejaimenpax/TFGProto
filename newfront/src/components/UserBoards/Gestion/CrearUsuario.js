import React from "react";

const CrearUsuario = (props) => {


    return (
        <div className="generate-credentials">
            <h4>Crear nuevo usuario</h4>
            <div className="form-group">
              <label>Nombre y apellidos:</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={props.newUser.fullName}
                onChange={props.handleNewUserChange}
              />
            </div>
            <p className={props.usernameErrorMessage ? "alert alert-danger" : "hide"}>
              {props.usernameErrorMessage}
            </p>
            <button
              type="button"
              className="btn btn-custom"
              onClick={props.handleShowUsername}
            >
              Generar nombre
            </button>
            {props.showUsername && (<div className={props.showUsername ? "form form-group" : "hide"}>
              <label>Nombre de usuario generado:</label>
              <input
                type="text"
                className="form-control"
                value={props.newUser.username}
                readOnly
              />
            </div>)}

            <div className="form-group">
              <label>Rol:</label>
              <select
                className="form-control"
                name="role"
                value={props.newUser.role}
                onChange={props.handleRoleChange}
                disabled={props.user.username === props.user.teacher} // Deshabilita todo el selector si lo invoca un profesor
              >
                {props.user.username === props.user.teacher ? ( // Si es profesor, solo puede crear alumnos
                  <option value="user">Alumno</option>
                ) : (
                  // Si A no es igual a B, mostrar todas las opciones
                  <>
                    <option value="" disabled>
                      Selecciona una opción...
                    </option>
                    <option value="user">Alumno</option>
                    <option value="teacher">Profesor</option>
                  </>
                )}
              </select>
            </div>

            {props.showTeacherSelector && (
            <div className="form-group">
              <label>Profesor asociado:</label>
              <select
                className="form-control"
                name="teacher"
                value={props.newUser.teacher}
                onChange={props.handleNewUserChange}
              >
                  <option value="" disabled selected>
                    Selecciona una opción...
                  </option>
                {props.teachers.map((teacher, index) => (
                  <option key={index} value={teacher}>
                    {teacher}
                  </option>
                ))}
              </select>
            </div>
            )}
            <p className={props.generalErrorMessage ? "alert alert-danger" : "hide"}>
              {props.generalErrorMessage}
            </p>
            <button
              type="button"
              className="btn btn-custom"
              onClick={props.createUser}
            >
              Crear usuario
            </button>
          </div>

    );
};

export default CrearUsuario;
