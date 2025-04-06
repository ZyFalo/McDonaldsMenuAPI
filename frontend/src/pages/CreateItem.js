import React, { useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

function CreateItem() {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        description: "",
        image_url: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores previos

        // Solicitud al endpoint POST /menu/
        axiosInstance.post("/menu/", formData)
            .then(() => {
                alert("Ítem creado exitosamente");
                navigate("/admin"); // Redirige al panel de administración
            })
            .catch((error) => {
                console.error("Error al crear el ítem:", error);
                setError("No se pudo crear el ítem. Inténtalo de nuevo.");
            });
    };

    const handleCancel = () => {
        navigate("/admin"); // Redirigir al panel de administración
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
                maxWidth: "500px",
                textAlign: "center",
            }}>
                <h1 style={{ color: "#d52b1e", marginBottom: "20px" }}>Crear Ítem</h1>
                {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
                <form onSubmit={handleSubmit} style={{ padding: "0 20px" }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
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
                        type="text"
                        name="category"
                        placeholder="Categoría"
                        value={formData.category}
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
                        type="number"
                        name="price"
                        placeholder="Precio"
                        value={formData.price}
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
                        type="text"
                        name="image_url"
                        placeholder="URL de la imagen"
                        value={formData.image_url}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            fontSize: "16px",
                        }}
                    />
                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            fontSize: "16px",
                            resize: "none",
                        }}
                    />
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        <button
                            type="submit"
                            style={{
                                flex: 1,
                                padding: "10px",
                                backgroundColor: "#d52b1e",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            Crear Ítem
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            style={{
                                flex: 1,
                                padding: "10px",
                                backgroundColor: "#555",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateItem;