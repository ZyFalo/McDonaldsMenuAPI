import React from "react";
import ReactDOM from "react-dom/client"; // Importa createRoot desde react-dom/client
import "./index.css"; // Importa los estilos globales
import App from "./App"; // Importa el componente raíz

// Crea el root y renderiza la aplicación
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);