import React from "react";

const Username = ({ username }) => {
  return (
    <div className="profile-row">
      <div className="text-center"><b>Nombre: </b>{username}</div>
    </div>
  );
};

export default Username;
