import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import MenuItemCard from "../components/MenuItemCard";

function Home() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Solicitud al endpoint GET /menu/
        setLoading(true);
        axiosInstance.get("/menu/")
            .then((response) => {
                // Asegúrate de que los datos son un array
                const data = Array.isArray(response.data) ? response.data : [];
                console.log("Datos recibidos:", data);
                setMenuItems(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener el menú:", error);
                setError("Error al cargar el menú");
                setMenuItems([]);
                setLoading(false);
            });
    }, []);

    // Agrupar los ítems por categoría (con verificación de tipo)
    const groupedItems = Array.isArray(menuItems) ? menuItems.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {}) : {};

    if (loading) {
        return (
            <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center", 
                height: "100vh",
                background: "#fff" 
            }}>
                <img 
                    src="https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-mcdonald-logo-logo-white-circle-black-vector-png-image_6974971.png" 
                    alt="McDonald's Logo" 
                    style={{ width: "80px", marginBottom: "20px" }} 
                />
                <div style={{ 
                    fontSize: "18px", 
                    fontWeight: "500", 
                    color: "#292929",
                    fontFamily: "'Speedee', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
                }}>
                    Cargando menú...
                </div>
                <div style={{ 
                    width: "50px", 
                    height: "4px", 
                    background: "#ffbc0d", 
                    marginTop: "15px", 
                    borderRadius: "2px" 
                }}></div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center", 
                height: "100vh",
                background: "#fff" 
            }}>
                <img 
                    src="https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-mcdonald-logo-logo-white-circle-black-vector-png-image_6974971.png" 
                    alt="McDonald's Logo" 
                    style={{ width: "80px", marginBottom: "20px" }} 
                />
                <div style={{ 
                    fontSize: "18px", 
                    fontWeight: "500", 
                    color: "#d32b1e",
                    fontFamily: "'Speedee', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
                }}>
                    {error}
                </div>
                <button 
                    onClick={() => window.location.reload()}
                    style={{
                        background: "#ffbc0d",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        marginTop: "20px",
                        cursor: "pointer"
                    }}
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div style={{ 
            fontFamily: "'Speedee', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", 
            backgroundColor: "#f8f8f8", 
            minHeight: "100vh" 
        }}>
            {/* Header */}
            <header style={{ 
                backgroundColor: "#ffffff", 
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)", 
                padding: "15px 20px", 
                position: "sticky", 
                top: 0, 
                zIndex: 100,
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center" 
            }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img 
                        src="https://www.freepnglogos.com/uploads/mcdonalds-png-logo/mcdonalds-logo-brand-png-clip-art-30.png" 
                        alt="McDonald's Logo" 
                        style={{ height: "40px", marginRight: "15px" }} 
                    />
                    <h1 style={{ 
                        color: "#292929", 
                        margin: 0, 
                        fontSize: "24px", 
                        fontWeight: "700" 
                    }}>
                        Menú
                    </h1>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        onClick={() => window.open("https://mcdonaldsmenuapi-production.up.railway.app/docs", "_blank")}
                        style={{
                            backgroundColor: "#292929",
                            color: "white",
                            border: "none",
                            padding: "10px 18px",
                            cursor: "pointer",
                            borderRadius: "6px",
                            fontWeight: "600",
                            fontSize: "14px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            transition: "all 0.2s ease"
                        }}
                    >
                        Doc. API
                    </button>
                    <button
                        onClick={() => window.location.href = "/login"}
                        style={{
                            backgroundColor: "#ffbc0d",
                            color: "#292929",
                            border: "none",
                            padding: "10px 18px",
                            cursor: "pointer",
                            borderRadius: "6px",
                            fontWeight: "600",
                            fontSize: "14px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            transition: "all 0.2s ease"
                        }}
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </header>

            {/* Banner */}
            <div style={{
                background: "linear-gradient(to right, #db0007, #ff1a1a)",
                padding: "40px 20px",
                textAlign: "center",
                color: "white"
            }}>
                <h1 style={{ 
                    fontSize: "36px", 
                    fontWeight: "800",
                    margin: "0 0 10px 0",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.2)"
                }}>
                    McDonald's Menu
                </h1>
                <p style={{ 
                    fontSize: "18px", 
                    maxWidth: "800px", 
                    margin: "0 auto",
                    opacity: "0.9"
                }}>
                    Descubre nuestros deliciosos productos preparados con ingredientes de calidad
                </p>
            </div>

            {/* Contenido del Menú */}
            <main style={{ 
                padding: "30px 20px", 
                maxWidth: "1200px", 
                margin: "0 auto" 
            }}>
                {Object.keys(groupedItems).length === 0 ? (
                    <div style={{ 
                        textAlign: "center", 
                        padding: "40px 20px", 
                        background: "white", 
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}>
                        <img 
                            src="https://www.mcdonalds.com/content/dam/sites/usa/nfl/logo/mcdonalds-logo-full-color-128x128.jpg" 
                            alt="McDonald's Logo" 
                            style={{ width: "60px", marginBottom: "20px", opacity: "0.7" }} 
                        />
                        <p style={{ 
                            color: "#555", 
                            fontSize: "18px", 
                            marginTop: "15px",
                            fontWeight: "500" 
                        }}>
                            No hay productos disponibles en el menú en este momento.
                        </p>
                        <button 
                            onClick={() => window.location.reload()}
                            style={{
                                background: "#ffbc0d",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "4px",
                                fontWeight: "bold",
                                marginTop: "20px",
                                cursor: "pointer"
                            }}
                        >
                            Actualizar Menú
                        </button>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                        {Object.keys(groupedItems).map((category) => (
                            <div key={category}>
                                <div style={{ 
                                    position: "relative",
                                    marginBottom: "30px", 
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <h2 style={{ 
                                        color: "#292929", 
                                        textAlign: "center",
                                        fontSize: "28px",
                                        fontWeight: "700",
                                        position: "relative",
                                        display: "inline-block",
                                        padding: "0 15px"
                                    }}>
                                        {category}
                                        <div style={{ 
                                            position: "absolute",
                                            bottom: "-8px",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            width: "40%",
                                            height: "4px",
                                            background: "#ffbc0d",
                                            borderRadius: "2px"
                                        }}></div>
                                    </h2>
                                </div>
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        gap: "25px",
                                        padding: "0 10px",
                                    }}
                                >
                                    {groupedItems[category].map((item) => (
                                        <div
                                            key={item.id}
                                            style={{
                                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                                                borderRadius: "12px",
                                                backgroundColor: "white",
                                                padding: "0",
                                                overflow: "hidden",
                                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                                ":hover": {
                                                    transform: "translateY(-5px)",
                                                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)"
                                                }
                                            }}
                                        >
                                            <div style={{ height: "180px", overflow: "hidden" }}>
                                                <img 
                                                    src={item.image_url || "https://www.mcdonalds.com/content/dam/sites/usa/nfl/publication/1PUB_McDelivery_InApp_1168x520.jpg"}
                                                    alt={item.name}
                                                    style={{ 
                                                        width: "100%", 
                                                        height: "100%", 
                                                        objectFit: "cover",
                                                        transition: "transform 0.5s ease"
                                                    }}
                                                />
                                            </div>
                                            <div style={{ padding: "20px" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                                                    <h3 style={{ 
                                                        margin: "0 0 8px 0", 
                                                        color: "#292929",
                                                        fontSize: "18px",
                                                        fontWeight: "700"
                                                    }}>
                                                        {item.name}
                                                    </h3>
                                                    <span style={{ 
                                                        fontWeight: "bold", 
                                                        color: "#d32b1e",
                                                        fontSize: "18px"
                                                    }}>
                                                        ${item.price.toFixed(2)}
                                                    </span>
                                                </div>
                                                <p style={{ 
                                                    margin: "0", 
                                                    color: "#666",
                                                    fontSize: "14px",
                                                    lineHeight: "1.4",
                                                    height: "58px",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: "3",
                                                    WebkitBoxOrient: "vertical"
                                                }}>
                                                    {item.description || "Delicioso producto de McDonald's."}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer style={{ 
                backgroundColor: "#292929", 
                color: "white", 
                padding: "30px 0", 
                marginTop: "60px" 
            }}>
                <div style={{ 
                    maxWidth: "1200px", 
                    margin: "0 auto", 
                    padding: "0 20px",
                    textAlign: "center" 
                }}>
                    <img 
                        src="https://www.freepnglogos.com/uploads/mcdonalds-png-logo/mcdonalds-logo-brand-png-clip-art-30.png" 
                        alt="McDonald's Arches" 
                        style={{ height: "50px", marginBottom: "20px" }} 
                    />
                    <p style={{ 
                        margin: "0 0 15px 0",
                        fontSize: "14px",
                        opacity: "0.8"
                    }}>
                        © 2025 McDonald's. Todos los derechos reservados.
                    </p>
                    <div style={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        gap: "20px",
                        margin: "0 auto",
                        maxWidth: "400px"
                    }}>
                        <a href="#" style={{ color: "white", textDecoration: "none", fontSize: "14px", opacity: "0.8" }}>Política de Privacidad</a>
                        <a href="#" style={{ color: "white", textDecoration: "none", fontSize: "14px", opacity: "0.8" }}>Términos de Uso</a>
                        <a href="#" style={{ color: "white", textDecoration: "none", fontSize: "14px", opacity: "0.8" }}>Contacto</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;