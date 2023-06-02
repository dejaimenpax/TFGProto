import React, { useState, useEffect } from "react";

import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import SelectStudent from "./SelectStudent";

const BoardTeacher = () => {
  const [content, setContent] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    AuthService.getCurrentUserFromDB()
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
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
      });
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        {user ? <SelectStudent user={user} /> : <h3>{content}</h3>}
      </header>
    </div>
  );
};

export default BoardTeacher;