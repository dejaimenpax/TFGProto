import React from "react";

const Roles = ({ roles }) => {
  return (
    <div className="profile-row">
      <div className="profile-label">Rol:</div>
      <div className="profile-value">
        {roles &&
          roles.map((role, index) => (
            <span key={index} className="role-tag">
              {role === "ROLE_TEACHER" ? 
                "Profesor" 
                : 
                role === "ROLE_USER" ? 
                  "Alumno" 
                  : 
                  role
              }
            </span>
          ))}
      </div>
    </div>
  );
};

export default Roles;
