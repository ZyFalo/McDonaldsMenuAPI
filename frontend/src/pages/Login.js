import React, { useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const data = new URLSearchParams();
        data.append("username", formData.username);
        data.append("password", formData.password);

        // Usar axiosInstance en lugar de axios directo
        axiosInstance.post("/token", data, {
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
                setLoading(false);
            });
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "linear-gradient(135deg, #ffcc00 0%, #ffbc0d 100%)",
            fontFamily: "'Speedee', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                width: "100%",
                maxWidth: "420px",
                textAlign: "center",
            }}>
                <img 
                    src="https://w7.pngwing.com/pngs/873/995/png-transparent-mcdonald-s-logo-oldest-mcdonald-s-restaurant-ronald-mcdonald-logo-golden-arches-mcdonalds-miscellaneous-angle-food-thumbnail.png" 
                    alt="McDonald's Logo" 
                    style={{ width: "80px", marginBottom: "20px" }} 
                />
                <h1 style={{ 
                    color: "#292929", 
                    marginBottom: "25px", 
                    fontSize: "28px", 
                    fontWeight: "700" 
                }}>Iniciar Sesión</h1>
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
                            padding: "14px",
                            marginBottom: "16px",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            fontSize: "16px",
                            outline: "none",
                            transition: "border-color 0.3s",
                            ":focus": {
                                borderColor: "#ffbc0d"
                            }
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
                            padding: "14px",
                            marginBottom: "20px",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            fontSize: "16px",
                            outline: "none"
                        }}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "14px",
                            backgroundColor: "#ffbc0d",
                            color: "#292929",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "700",
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.8 : 1,
                            transition: "all 0.2s ease",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        {loading ? "Procesando..." : "Iniciar Sesión"}
                    </button>
                </form>
                {error && <p style={{ 
                    color: "#d32b1e", 
                    marginTop: "15px", 
                    fontSize: "14px",
                    fontWeight: "500"
                }}>{error}</p>}
                <button
                    onClick={() => navigate("/")}
                    style={{
                        marginTop: "20px",
                        padding: "14px",
                        backgroundColor: "#292929",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                        width: "100%",
                        transition: "all 0.2s ease",
                    }}
                >
                    Volver al Menú
                </button>
            </div>
        </div>
    );
}

export default Login;