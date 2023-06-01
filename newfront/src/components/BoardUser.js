import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import StatsPage from "./StatsPage";

const BoardUser = () => {
  const [content, setContent] = useState();

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
        {content==="Logged" ? <StatsPage /> : <h3>{content}</h3>}
      </header>
    </div>
  );
};

export default BoardUser;
