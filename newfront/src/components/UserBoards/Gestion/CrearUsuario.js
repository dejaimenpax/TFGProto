import React from "react";

const CrearUsuario = (props) => {



    return (
        <div className="generate-credentials">
            <h4>Crear nuevo usuario</h4>
            <div className="form-group">
              <label>Nombre de usuario:</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={props.newUser.username}
                onChange={props.handleNewUserChange}
              />
            </div>

            <p className={props.usernameErrorMessage ? "alert alert-danger" : "hide"}>
              {props.usernameErrorMessage}
            </p>

            <div className="form-group">
              <label>Contraseña:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={props.newUser.password}
                onChange={props.handleNewUserChange}
              />
            </div>

            <p className={props.passwordErrorMessage ? "alert alert-danger" : "hide"}>
              {props.passwordErrorMessage}
            </p>

            {(props.user.username !== props.user.teacher) && (
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
            )}

            {props.showTeacherInput && (
            <div className="form-group">
              <label>Código del profesor asociado:</label>
              <input
                type="text"
                className={`form-control ${props.teacherNotFoundError ? 'is-invalid' : ''}`}
                name="teacherCode"
                value={props.teacherCode}
                onChange={props.onChangeTeacherCode}
                //onBlur={props.onChangeTeacherCode}
                disabled={props.user.username === props.user.teacher}
              />
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
            <button
              type="button"
              className="btn btn-danger special-margin"
              onClick={props.handleCreateUserModalClose}
            >
              Volver a gestión
            </button>

            {props.registerMessage!=="" && (
            <div className="form-group">
              <div
                className={props.successfulRegister ? "text-center alert alert-success" : "text-center alert alert-danger"}
                role="alert"
              >
                {props.registerMessage}
              </div>
            </div>
            )}
        </div>

    );
};

export default CrearUsuario;
