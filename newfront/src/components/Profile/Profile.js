import React from "react";
import AuthService from "../../services/auth.service";
import StatsPage from "./StatsPage";
import Email from "./Email";
import Roles from "./Roles";
import "../../styles/Profile.css";
import Dni from "./Dni";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <div className="jumbotron">
        <Dni dni={currentUser.dni} />
        <Email email={currentUser.email} />
        <Roles roles={currentUser.roles} />
      </div>
      <StatsPage />
    </div>
  );
};

export default Profile;