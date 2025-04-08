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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Solicitud al endpoint POST /menu/
        axiosInstance.post("/menu/", formData)
            .then(() => {
                setLoading(false);
                navigate("/admin", { state: { notification: "Producto creado exitosamente" } });
            })
            .catch((error) => {
                console.error("Error al crear el producto:", error);
                setError("No se pudo crear el producto. Inténtalo de nuevo.");
                setLoading(false);
            });
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
                        Crear Nuevo Producto
                    </h1>
                </div>
                <button
                    onClick={() => navigate("/admin")}
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
                    Volver al Panel
                </button>
            </header>

            {/* Banner */}
            <div style={{
                background: "linear-gradient(to right, #ffbc0d, #ffcc00)",
                padding: "30px 20px",
                textAlign: "center",
                color: "#292929"
            }}>
                <h1 style={{ 
                    fontSize: "28px", 
                    fontWeight: "800",
                    margin: "0 0 10px 0",
                }}>
                    Agregar Nuevo Producto al Menú
                </h1>
                <p style={{ 
                    fontSize: "16px", 
                    maxWidth: "800px", 
                    margin: "0 auto",
                    opacity: "0.9"
                }}>
                    Complete el formulario para añadir un nuevo producto al menú de McDonald's
                </p>
            </div>

            {/* Form Content */}
            <div style={{
                maxWidth: "800px",
                margin: "30px auto",
                padding: "0 20px",
                width: "100%"
            }}>
                <div style={{
                    backgroundColor: "white",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)"
                }}>
                    {error && (
                        <div style={{
                            backgroundColor: "#ffebee",
                            color: "#d32f2f",
                            padding: "16px",
                            borderRadius: "8px",
                            marginBottom: "25px",
                            fontSize: "14px",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <div style={{ marginBottom: "24px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#292929"
                            }}>
                                Nombre del Producto
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Ej: Big Mac"
                                style={{
                                    width: "100%",
                                    padding: "14px",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    transition: "border-color 0.3s",
                                    outline: "none"
                                }}
                            />
                        </div>

                        <div style={{ 
                            display: "grid", 
                            gridTemplateColumns: "1fr 1fr",
                            gap: "20px",
                            marginBottom: "24px"
                        }}>
                            <div>
                                <label style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#292929"
                                }}>
                                    Categoría
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ej: Hamburguesas"
                                    style={{
                                        width: "100%",
                                        padding: "14px",
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "8px",
                                        fontSize: "16px",
                                        transition: "border-color 0.3s",
                                        outline: "none"
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#292929"
                                }}>
                                    Precio ($)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ej: 5.99"
                                    step="0.01"
                                    min="0"
                                    style={{
                                        width: "100%",
                                        padding: "14px",
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "8px",
                                        fontSize: "16px",
                                        transition: "border-color 0.3s",
                                        outline: "none"
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#292929"
                            }}>
                                URL de la Imagen
                            </label>
                            <input
                                type="url"
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleChange}
                                placeholder="Ej: https://ejemplo.com/imagen.jpg"
                                style={{
                                    width: "100%",
                                    padding: "14px",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    transition: "border-color 0.3s",
                                    outline: "none"
                                }}
                            />
                            <p style={{ 
                                fontSize: "12px", 
                                color: "#666", 
                                marginTop: "6px" 
                            }}>
                                Opcional. Si se deja en blanco, se usará una imagen predeterminada.
                            </p>
                        </div>

                        <div style={{ marginBottom: "32px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#292929"
                            }}>
                                Descripción
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                placeholder="Describe el producto..."
                                rows="4"
                                style={{
                                    width: "100%",
                                    padding: "14px",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    resize: "vertical",
                                    minHeight: "100px",
                                    fontFamily: "'Speedee', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                                    transition: "border-color 0.3s",
                                    outline: "none"
                                }}
                            />
                        </div>

                        <div style={{ 
                            display: "flex", 
                            gap: "16px",
                            justifyContent: "flex-end" 
                        }}>
                            <button
                                type="button"
                                onClick={() => navigate("/admin")}
                                style={{
                                    padding: "14px 24px",
                                    backgroundColor: "#f5f5f5",
                                    color: "#292929",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    padding: "14px 32px",
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
                                {loading ? "Guardando..." : "Guardar Producto"}
                            </button>
                        </div>
                    </form>
                </div>

                {formData.image_url && (
                    <div style={{ 
                        marginTop: "25px", 
                        backgroundColor: "white", 
                        padding: "15px", 
                        borderRadius: "8px",
                        textAlign: "center",
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)"
                    }}>
                        <p style={{ 
                            fontSize: "14px", 
                            fontWeight: "600", 
                            marginBottom: "10px",
                            color: "#292929"
                        }}>
                            Vista previa de la imagen
                        </p>
                        <div style={{ 
                            width: "100%",
                            height: "200px",
                            overflow: "hidden", 
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5"
                        }}>
                            <img 
                                src={formData.image_url} 
                                alt="Vista previa" 
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-mcdonald-logo-logo-white-circle-black-vector-png-image_6974971.png";
                                }}
                                style={{ 
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateItem;