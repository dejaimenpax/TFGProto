import React from "react";

const Username = ({ username }) => {
  return (
    <div className="profile-row">
      <div className="profile-label text-center">Nombre:</div>
      <div className="profile-value text-center">{username}</div>
    </div>
  );
};

export default Username;
