import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Obtener los ítems del menú al cargar la página
    useEffect(() => {
        setLoading(true);
        axiosInstance.get("/menu/")
            .then((response) => {
                const data = Array.isArray(response.data) ? response.data : [];
                setMenuItems(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener el menú:", error);
                setError("Error al cargar los datos del menú");
                setLoading(false);
            });
    }, []);

    // Manejar la eliminación de un ítem
    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este ítem?")) {
            setLoading(true);
            axiosInstance.delete(`/menu/${id}`)
                .then(() => {
                    setMenuItems(menuItems.filter((item) => item.id !== id));
                    setLoading(false);
                    // Mostrar notificación de éxito
                    showNotification("Ítem eliminado exitosamente");
                })
                .catch((error) => {
                    console.error("Error al eliminar el ítem:", error);
                    setLoading(false);
                    setError("Error al eliminar el ítem");
                });
        }
    };

    // Manejar la eliminación de todos los ítems
    const handleDeleteAll = () => {
        if (window.confirm("¿Estás seguro de que deseas eliminar todos los ítems del menú? Esta acción no se puede deshacer.")) {
            setLoading(true);
            axiosInstance.delete("/menu/all")
                .then((response) => {
                    setMenuItems([]);
                    setLoading(false);
                    // Mostrar notificación de éxito
                    showNotification(response.data.message || "Todos los ítems han sido eliminados");
                })
                .catch((error) => {
                    console.error("Error al eliminar todos los ítems:", error);
                    setLoading(false);
                    setError("Error al eliminar todos los ítems");
                });
        }
    };

    // Función para mostrar notificación temporal
    const [notification, setNotification] = useState(null);
    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    // Manejar el cierre de sesión
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div style={{
            fontFamily: "'Speedee', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            backgroundColor: "#f8f8f8",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
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
                        src="https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-mcdonald-logo-logo-white-circle-black-vector-png-image_6974971.png" 
                        alt="McDonald's Logo" 
                        style={{ height: "40px", marginRight: "15px" }} 
                    />
                    <h1 style={{ 
                        color: "#292929", 
                        margin: 0, 
                        fontSize: "24px", 
                        fontWeight: "700" 
                    }}>
                        Panel de Administración
                    </h1>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        onClick={() => navigate("/")}
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
                        Ver Menú
                    </button>
                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: "#d32b1e",
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
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            {/* Banner */}
            <div style={{
                background: "linear-gradient(to right, #292929, #444)",
                padding: "30px 20px",
                textAlign: "center",
                color: "white"
            }}>
                <h1 style={{ 
                    fontSize: "32px", 
                    fontWeight: "800",
                    margin: "0 0 10px 0",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.2)"
                }}>
                    Gestión del Menú
                </h1>
                <p style={{ 
                    fontSize: "16px", 
                    maxWidth: "800px", 
                    margin: "0 auto",
                    opacity: "0.9"
                }}>
                    Administra los productos, categorías y precios del menú de McDonald's
                </p>
            </div>

            {/* Notification message */}
            {notification && (
                <div style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "15px 25px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    zIndex: 1000,
                    animation: "fadeIn 0.3s ease-out",
                }}>
                    {notification}
                </div>
            )}

            {/* Main content */}
            <main style={{ 
                padding: "30px 20px", 
                maxWidth: "1200px", 
                margin: "0 auto",
                width: "100%" 
            }}>
                {/* Admin actions */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                    flexWrap: "wrap",
                    gap: "15px"
                }}>
                    <div>
                        <h2 style={{ 
                            margin: "0 0 5px 0", 
                            color: "#292929",
                            fontSize: "20px",
                            fontWeight: "700" 
                        }}>
                            Productos del Menú
                        </h2>
                        <p style={{ 
                            margin: 0, 
                            color: "#666",
                            fontSize: "14px" 
                        }}>
                            {menuItems.length} productos disponibles
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button
                            onClick={() => navigate("/admin/create")}
                            style={{
                                backgroundColor: "#ffbc0d",
                                color: "#292929",
                                border: "none",
                                padding: "12px 20px",
                                cursor: "pointer",
                                borderRadius: "6px",
                                fontWeight: "600",
                                fontSize: "14px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                transition: "all 0.2s ease"
                            }}
                        >
                            <span style={{ fontSize: "18px" }}>+</span>
                            Agregar Producto
                        </button>
                        <button
                            onClick={handleDeleteAll}
                            style={{
                                backgroundColor: "#d32b1e",
                                color: "white",
                                border: "none",
                                padding: "12px 20px",
                                cursor: "pointer",
                                borderRadius: "6px",
                                fontWeight: "600",
                                fontSize: "14px",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                transition: "all 0.2s ease"
                            }}
                        >
                            Eliminar Todo
                        </button>
                    </div>
                </div>

                {/* Loading state */}
                {loading && (
                    <div style={{ 
                        textAlign: "center", 
                        padding: "40px", 
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}>
                        <img 
                            src="https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-mcdonald-logo-logo-white-circle-black-vector-png-image_6974971.png" 
                            alt="McDonald's Logo" 
                            style={{ width: "60px", marginBottom: "20px", opacity: "0.7" }} 
                        />
                        <div style={{ 
                            fontSize: "18px", 
                            fontWeight: "500", 
                            color: "#292929"
                        }}>
                            Cargando datos...
                        </div>
                        <div style={{ 
                            width: "50px", 
                            height: "4px", 
                            background: "#ffbc0d", 
                            margin: "15px auto 0", 
                            borderRadius: "2px" 
                        }}></div>
                    </div>
                )}

                {/* Error state */}
                {error && !loading && (
                    <div style={{ 
                        textAlign: "center", 
                        padding: "40px", 
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}>
                        <div style={{ 
                            fontSize: "18px", 
                            fontWeight: "500", 
                            color: "#d32b1e"
                        }}>
                            {error}
                        </div>
                        <button 
                            onClick={() => window.location.reload()}
                            style={{
                                background: "#ffbc0d",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "6px",
                                fontWeight: "bold",
                                marginTop: "20px",
                                cursor: "pointer"
                            }}
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {/* Menu items table */}
                {!loading && !error && menuItems.length > 0 && (
                    <div style={{ 
                        backgroundColor: "white", 
                        borderRadius: "8px", 
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)", 
                        overflow: "hidden" 
                    }}>
                        <div style={{ 
                            overflowX: "auto", 
                            width: "100%" 
                        }}>
                            <table style={{ 
                                width: "100%", 
                                borderCollapse: "collapse", 
                                textAlign: "left" 
                            }}>
                                <thead>
                                    <tr style={{ 
                                        backgroundColor: "#292929", 
                                        color: "white" 
                                    }}>
                                        <th style={{ 
                                            padding: "16px", 
                                            fontWeight: "600", 
                                            fontSize: "14px" 
                                        }}>Imagen</th>
                                        <th style={{ 
                                            padding: "16px", 
                                            fontWeight: "600", 
                                            fontSize: "14px" 
                                        }}>Nombre</th>
                                        <th style={{ 
                                            padding: "16px", 
                                            fontWeight: "600", 
                                            fontSize: "14px" 
                                        }}>Categoría</th>
                                        <th style={{ 
                                            padding: "16px", 
                                            fontWeight: "600", 
                                            fontSize: "14px" 
                                        }}>Precio</th>
                                        <th style={{ 
                                            padding: "16px", 
                                            fontWeight: "600", 
                                            fontSize: "14px" 
                                        }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {menuItems.map((item) => (
                                        <tr 
                                            key={item.id} 
                                            style={{ 
                                                borderBottom: "1px solid #eee",
                                                transition: "background-color 0.2s"
                                            }}
                                        >
                                            <td style={{ 
                                                padding: "12px 16px" 
                                            }}>
                                                <div style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "6px",
                                                    overflow: "hidden",
                                                    backgroundColor: "#f2f2f2"
                                                }}>
                                                    <img 
                                                        src={item.image_url || "https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-mcdonald-logo-logo-white-circle-black-vector-png-image_6974971.png"}
                                                        alt={item.name}
                                                        style={{ 
                                                            width: "100%", 
                                                            height: "100%", 
                                                            objectFit: "cover" 
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td style={{ 
                                                padding: "12px 16px",
                                                fontWeight: "500"
                                            }}>{item.name}</td>
                                            <td style={{ 
                                                padding: "12px 16px" 
                                            }}>
                                                <span style={{
                                                    backgroundColor: "#f2f2f2",
                                                    padding: "4px 10px",
                                                    borderRadius: "20px",
                                                    fontSize: "12px",
                                                    color: "#444"
                                                }}>
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td style={{ 
                                                padding: "12px 16px", 
                                                fontWeight: "600",
                                                color: "#d32b1e"
                                            }}>${item.price.toFixed(2)}</td>
                                            <td style={{ 
                                                padding: "12px 16px",
                                                whiteSpace: "nowrap"
                                            }}>
                                                <button
                                                    onClick={() => navigate(`/admin/edit/${item.id}`)}
                                                    style={{
                                                        backgroundColor: "#292929",
                                                        color: "white",
                                                        border: "none",
                                                        padding: "8px 12px",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        marginRight: "8px",
                                                        fontSize: "13px",
                                                        fontWeight: "600",
                                                        transition: "all 0.2s ease"
                                                    }}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    style={{
                                                        backgroundColor: "#d32b1e",
                                                        color: "white",
                                                        border: "none",
                                                        padding: "8px 12px",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontSize: "13px",
                                                        fontWeight: "600",
                                                        transition: "all 0.2s ease"
                                                    }}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && menuItems.length === 0 && (
                    <div style={{ 
                        textAlign: "center", 
                        padding: "60px 20px", 
                        backgroundColor: "white", 
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}>
                        <img 
                            src="https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-mcdonald-logo-logo-white-circle-black-vector-png-image_6974971.png" 
                            alt="McDonald's Logo" 
                            style={{ width: "70px", marginBottom: "20px", opacity: "0.6" }} 
                        />
                        <h3 style={{ 
                            color: "#292929", 
                            fontWeight: "600",
                            fontSize: "20px",
                            margin: "0 0 10px 0"
                        }}>
                            No hay productos en el menú
                        </h3>
                        <p style={{ 
                            color: "#666", 
                            marginBottom: "25px",
                            fontSize: "15px" 
                        }}>
                            Comienza agregando tu primer producto al menú
                        </p>
                        <button
                            onClick={() => navigate("/admin/create")}
                            style={{
                                backgroundColor: "#ffbc0d",
                                color: "#292929",
                                border: "none",
                                padding: "14px 24px",
                                borderRadius: "6px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                fontSize: "15px"
                            }}
                        >
                            Agregar Producto
                        </button>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer style={{ 
                backgroundColor: "#292929", 
                color: "white", 
                padding: "20px 0", 
                marginTop: "auto",
                textAlign: "center"
            }}>
                <p style={{ 
                    margin: 0,
                    fontSize: "14px",
                    opacity: "0.8" 
                }}>
                    © 2025 McDonald's Admin Panel - Todos los derechos reservados
                </p>
            </footer>
        </div>
    );
}

export default AdminPanel;