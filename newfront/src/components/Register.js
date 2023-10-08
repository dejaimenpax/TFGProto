import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { useNavigate, Link } from "react-router-dom";
import { decrypt } from "../common/Encryption";
import { encryptionKey } from "../common/Config";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Es necesario seleccionar una opción.
      </div>
    );
  }
};

const validUsername = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        El nombre de usuario debe tener entre 6 y 40 caracteres.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        La contraseña debe tener entre 6 y 40 caracteres.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [userType, setUserType] = useState("");
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [userTypeError, setUserTypeError] = useState(false);

  const [teacherName, setTeacherName] = useState("");
  const [teacherNotFoundError, setTeacherNotFoundError] = useState(false); 
  const [teacherCode, setTeacherCode] = useState("")

  useEffect(() => {
    const fetchTeachers = () => {
      AuthService.getTeachers()
        .then((response) => {
          setTeacherOptions(response.data);
          console.log(response.data)
        })
    };

    fetchTeachers();
  }, []);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeUserType = (e) => {
    const userType = e.target.value;
    setUserType(userType);
    setUserTypeError(false);
  };

  const onChangeTeacherCode = (e) => {
    const code = e.target.value; //coge el codigo introducido
    console.log("El texto es", code)
    setTeacherCode(code)
    setTeacherName(decrypt(code, encryptionKey)) //desencripta ese codigo y obtiene el teachername
    console.log("El desencriptado es", teacherName)
    setTeacherNotFoundError(!teacherOptions.includes(teacherName))
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      if (userType === "profesor") {
        AuthService.register(username, password, username, "teacher").then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
            setTimeout(() => {
              navigate("/login"); // Redirigir a "/login" después de 3 segundos
              window.location.reload();
            }, 3000);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      } else if (userType === "alumno" && !teacherNotFoundError) {
        AuthService.register(username, password, teacherName, "user").then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      } else {
        if (!userType) {
          setUserTypeError(true);
        }
      }
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
      <h2 className= "text-center"><p>Registrarse</p></h2>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Nombre de usuario</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, validUsername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="userType">Tipo de usuario</label>
                <Select
                  className={`form-control ${userTypeError ? 'is-invalid' : ''}`}
                  name="userType"
                  value={userType}
                  onChange={onChangeUserType}
                  validations={[required]}
                >
                  <option value="">Seleccione un tipo de usuario</option>
                  <option value="alumno">Alumno</option>
                  <option value="profesor">Profesor</option>
                </Select>
                {userTypeError && (
                  <div className="invalid-feedback">
                    Debe seleccionar un tipo de usuario.
                  </div>
                )}
              </div>

              {userType === "alumno" && (
                <div className="form-group">
                  <label htmlFor="teacherCode">Código del profesor asociado</label>
                  <Input
                    type="text"
                    className={`form-control ${teacherNotFoundError ? 'is-invalid' : ''}`}
                    name="teacherCode"
                    value={teacherCode}
                    onChange={onChangeTeacherCode}
                  />
                </div>
              )}

              <div className="form-group">
                <button 
                  className="btn btn-custom btn-block"
                  disabled={teacherNotFoundError && userType === "alumno"}
                >
                  Registrarse
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={successful ? "text-center alert alert-success" : "text-center alert alert-danger"}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        {successful ?
          <Link to="/login" className="btn btn-custom btn-lg">Iniciar Sesión</Link>
          :
          <></>}
      </div>
    </div>
  );
};

export default Register;
