import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";

function EditItem() {
    const { id } = useParams(); // Obtener el id del ítem desde la URL
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        description: "",
        image_url: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Obtener los datos del ítem al cargar la página
    useEffect(() => {
        axiosInstance.get(`/menu/${id}`)
            .then((response) => {
                setFormData(response.data); // Prellenar el formulario con los datos del ítem
            })
            .catch((error) => {
                console.error("Error al obtener el ítem:", error);
                setError("No se pudo cargar el ítem. Inténtalo de nuevo.");
            });
    }, [id]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores previos

        axiosInstance.put(`/menu/${id}`, formData)
            .then(() => {
                alert("Ítem actualizado exitosamente");
                navigate("/admin"); // Redirigir al panel de administración
            })
            .catch((error) => {
                console.error("Error al actualizar el ítem:", error);
                setError("No se pudo actualizar el ítem. Inténtalo de nuevo.");
            });
    };

    // Manejar la cancelación
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
                <h1 style={{ color: "#d52b1e", marginBottom: "20px" }}>Editar Ítem</h1>
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
                            Actualizar Ítem
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

export default EditItem;