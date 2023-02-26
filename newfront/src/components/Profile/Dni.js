import React from "react";

const Dni = ({ dni }) => {
  return (
    <div className="profile-row">
      <div className="profile-label">NIF/NIE:</div>
      <div className="profile-value">{dni}</div>
    </div>
  );
};

export default Dni;
