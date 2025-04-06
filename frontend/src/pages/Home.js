import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import MenuItemCard from "../components/MenuItemCard";
import { useNavigate } from "react-router-dom";

function Home() {
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Solicitud al endpoint GET /menu/
        axiosInstance.get("/menu/")
            .then((response) => {
                setMenuItems(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener el menú:", error);
            });
    }, []);

    // Agrupar los ítems por categoría
    const groupedItems = menuItems.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
            {/* Header */}
            <header style={{ backgroundColor: "#ffcc00", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ color: "#d52b1e", margin: 0 }}>Menú</h1>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        onClick={() => window.open("http://127.0.0.1:8000/docs", "_blank")}
                        style={{
                            backgroundColor: "#555",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            cursor: "pointer",
                            borderRadius: "5px",
                        }}
                    >
                        Doc. API
                    </button>
                    <button
                        onClick={() => window.open("/login", "_blank")}
                        style={{
                            backgroundColor: "#d52b1e",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            cursor: "pointer",
                            borderRadius: "5px",
                        }}
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </header>

            {/* Contenido del Menú */}
            <main style={{ padding: "20px" }}>
                <h2 style={{ color: "#d52b1e", textAlign: "center" }}>Nuestros Productos</h2>
                {Object.keys(groupedItems).map((category) => (
                    <div key={category} style={{ marginBottom: "40px" }}>
                        <h3 style={{ color: "#d52b1e", textAlign: "left", marginBottom: "10px" }}>{category}</h3>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 1fr)", // 3 columnas
                                gap: "20px",
                                justifyContent: "center",
                                padding: "10px",
                            }}
                        >
                            {groupedItems[category].map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                        borderRadius: "10px",
                                        backgroundColor: "white",
                                        padding: "10px",
                                    }}
                                >
                                    <MenuItemCard item={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: "#d52b1e", color: "white", textAlign: "center", padding: "10px 0", marginTop: "20px" }}>
                <p style={{ margin: 0 }}>© 2025 McDonald's Menu. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default Home;