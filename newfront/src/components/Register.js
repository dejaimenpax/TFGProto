import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

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

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        El email introducido no es válido.
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [userType, setUserType] = useState("");
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [userTypeError, setUserTypeError] = useState(false);
  const [selectedTeacherError, setSelectedTeacherError] = useState(false);

  useEffect(() => {
    const fetchTeachers = () => {
      AuthService.getTeachers()
        .then((response) => {
          setTeacherOptions(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          // Manejar el error
        });
    };

    fetchTeachers();
  }, []);

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
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

  const onChangeSelectedTeacher = (e) => {
    const teacher = e.target.value;
    setSelectedTeacher(teacher);
    setSelectedTeacherError(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      if (userType === "profesor") {
        AuthService.register(email, password, email, "teacher").then(
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
      } else if (userType === "alumno" && selectedTeacher) {
        AuthService.register(email, password, selectedTeacher, "user").then(
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
        if (!selectedTeacher) {
          setSelectedTeacherError(true);
        }
      }
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
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
                  <label htmlFor="selectedTeacher">Profesor asociado</label>
                  <Select
                    className={`form-control ${selectedTeacherError ? 'is-invalid' : ''}`}
                    name="selectedTeacher"
                    value={selectedTeacher}
                    onChange={onChangeSelectedTeacher}
                    validations={[required]}
                  >
                    <option value="">Seleccione un profesor</option>
                    {teacherOptions.map((teacher, index) => (
                      <option key={index} value={teacher}>
                        {teacher}
                      </option>
                    ))}
                  </Select>
                  {selectedTeacherError && (
                    <div className="invalid-feedback">
                      Debe seleccionar un profesor.
                    </div>
                  )}
                </div>
              )}

              <div className="form-group">
                <button className="btn btn-primary btn-block">Registrarse</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
