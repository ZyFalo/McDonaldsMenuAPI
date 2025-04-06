import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate();

    // Obtener los ítems del menú al cargar la página
    useEffect(() => {
        axiosInstance.get("/menu/")
            .then((response) => {
                setMenuItems(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener el menú:", error);
            });
    }, []);

    // Manejar la eliminación de un ítem
    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este ítem?")) {
            axiosInstance.delete(`/menu/${id}`)
                .then(() => {
                    alert("Ítem eliminado exitosamente");
                    setMenuItems(menuItems.filter((item) => item.id !== id)); // Actualizar la lista
                })
                .catch((error) => {
                    console.error("Error al eliminar el ítem:", error);
                });
        }
    };

    // Manejar el cierre de sesión
    const handleLogout = () => {
        localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
        navigate("/login"); // Redirigir al login
    };

    return (
        <div style={{
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#ffcc00", // Fondo amarillo clásico de McDonald's
            minHeight: "100vh",
            padding: "20px",
        }}>
            <header style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
            }}>
                <h1 style={{ color: "#d52b1e" }}>Panel de Administración</h1>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#d52b1e",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Cerrar Sesión
                </button>
            </header>
            <button
                onClick={() => navigate("/admin/create")}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#d52b1e",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginBottom: "20px",
                }}
            >
                Crear Nuevo Ítem
            </button>
            <div style={{
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                padding: "20px",
            }}>
                {menuItems.length > 0 ? (
                    <table style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        textAlign: "left",
                    }}>
                        <thead>
                            <tr style={{ backgroundColor: "#d52b1e", color: "white" }}>
                                <th style={{ padding: "10px" }}>Nombre</th>
                                <th style={{ padding: "10px" }}>Categoría</th>
                                <th style={{ padding: "10px" }}>Precio</th>
                                <th style={{ padding: "10px" }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menuItems.map((item) => (
                                <tr key={item.id} style={{ borderBottom: "1px solid #ccc" }}>
                                    <td style={{ padding: "10px" }}>{item.name}</td>
                                    <td style={{ padding: "10px" }}>{item.category}</td>
                                    <td style={{ padding: "10px" }}>${item.price}</td>
                                    <td style={{ padding: "10px" }}>
                                        <button
                                            onClick={() => navigate(`/admin/edit/${item.id}`)}
                                            style={{
                                                padding: "5px 10px",
                                                backgroundColor: "#555",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                                marginRight: "10px",
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            style={{
                                                padding: "5px 10px",
                                                backgroundColor: "#d52b1e",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{ textAlign: "center", color: "#555" }}>No hay ítems en el menú.</p>
                )}
            </div>
        </div>
    );
}

export default AdminPanel;