import React from "react";

const ModificarUsuario = (props) => {



    return (
        <div className="generate-credentials">
            <h4>Restablecer contraseña de {props.newUser.username}</h4>
            <div className="form-group">
              <label>Nueva contraseña:</label>
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

            <button
              type="button"
              className="btn btn-custom"
              onClick={props.resetPassword}
              disabled={props.passwordErrorMessage!==''}
            >
              Cambiar contraseña
            </button>
            <button
              type="button"
              className="btn btn-danger special-margin"
              onClick={props.handleResetPasswordModalClose}
            >
              Volver a gestión
            </button>

            {props.resetMessage!=="" && (
            <div className="form-group">
              <div
                className={props.successfulReset ? "text-center alert alert-success" : "text-center alert alert-danger"}
                role="alert"
              >
                {props.resetMessage}
              </div>
            </div>
            )}
        </div>

    );
};

export default ModificarUsuario;
