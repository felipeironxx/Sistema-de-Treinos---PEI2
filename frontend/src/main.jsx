import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // importa TailwindCSS

// Renderiza a aplicação React dentro do div#root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
