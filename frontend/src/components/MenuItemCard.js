import React from "react";

function MenuItemCard({ item }) {
    return (
        <div style={{ textAlign: "center" }}>
            <img
                src={item.image_url}
                alt={item.name}
                style={{
                    width: "350px", // Ancho fijo
                    height: "350px", // Alto fijo
                    objectFit: "cover", // Ajustar la imagen para que no se deforme
                    borderRadius: "10px", // Bordes redondeados
                    margin: "0 auto", // Centrar la imagen
                }}
            />
            <h2 style={{ color: "#d52b1e", margin: "10px 0" }}>{item.name}</h2>
            <p style={{ color: "#555", margin: "5px 0" }}>Precio: ${item.price}</p>
            <p style={{ color: "#777", margin: "10px 0" }}>{item.description}</p>
        </div>
    );
}

export default MenuItemCard;