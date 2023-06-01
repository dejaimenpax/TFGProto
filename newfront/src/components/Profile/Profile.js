import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import Email from "./Email";
import Roles from "./Roles";
import "../../styles/Profile/Profile.css";
import AuthService from "../../services/auth.service";

const Profile = () => {
  const [content, setContent] = useState();
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent("Logged");
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        {content==="Logged" ? 
          <>
            <Email email={currentUser.email} />
            <Roles roles={currentUser.roles} />
          </>
        : 
          <>{content}</>
        }
      </header>
    </div>
  );
};

export default Profile;