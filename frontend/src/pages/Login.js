import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const data = new URLSearchParams();
        data.append("username", formData.username);
        data.append("password", formData.password);

        axios.post("http://127.0.0.1:8000/token", data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then((response) => {
                const { access_token } = response.data;
                localStorage.setItem("token", access_token);
                navigate("/admin");
            })
            .catch((error) => {
                console.error("Error al iniciar sesión:", error);
                setError("Credenciales inválidas. Inténtalo de nuevo.");
            });
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#ffcc00", // Fondo amarillo clásico de McDonald's
            fontFamily: "Arial, sans-serif",
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "100%",
                maxWidth: "400px",
                textAlign: "center",
            }}>
                <h1 style={{ color: "#d52b1e", marginBottom: "20px" }}>Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Nombre de usuario"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            fontSize: "16px",
                        }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            fontSize: "16px",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "#d52b1e",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "16px",
                            cursor: "pointer",
                        }}
                    >
                        Iniciar Sesión
                    </button>
                </form>
                {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
                <button
                    onClick={() => navigate("/")}
                    style={{
                        marginTop: "15px",
                        padding: "10px",
                        backgroundColor: "#555",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "16px",
                        cursor: "pointer",
                        width: "100%",
                    }}
                >
                    Volver al Menú
                </button>
            </div>
        </div>
    );
}

export default Login;