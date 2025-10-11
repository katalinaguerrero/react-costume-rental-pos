import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bulma/css/bulma.min.css"; // Import Bulma CSS
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
