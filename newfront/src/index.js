import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import AuthService from "./services/auth.service";

//comprueba cada hora que no hayan pasado 24 horas para el token logado
setInterval(AuthService.checkTokenExpiration, 1000 * 60 * 60); 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

serviceWorker.unregister();