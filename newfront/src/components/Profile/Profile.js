import React from "react";
import AuthService from "../../services/auth.service";
import StatsPage from "./StatsPage";
import Email from "./Email";
import Roles from "./Roles";
import "../../styles/Profile/Profile.css";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <div className="jumbotron">
        <Email email={currentUser.email} />
        <Roles roles={currentUser.roles} />
      </div>
      <StatsPage />
    </div>
  );
};

export default Profile;