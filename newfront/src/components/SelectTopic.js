import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const SelectTopic = ({ handleSelect }) => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getUserBoard().then(
          (response) => {
            setContent(response.data);
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
      
    return(<>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Selecciona un bloque
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item">Bloque I</button>
                        <button className="dropdown-item">Bloque II</button>
                        <button className="dropdown-item">Bloque III</button>
                        <button className="dropdown-item">Bloque IV</button>
                    </div>
                </div>

            </>
    )
}

export default SelectTopic