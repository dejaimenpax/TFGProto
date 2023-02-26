import React from "react";

const Email = ({ email }) => {
  return (
    <div className="profile-row">
      <div className="profile-label">Email:</div>
      <div className="profile-value">{email}</div>
    </div>
  );
};

export default Email;
