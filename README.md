# McDonald's Menu API

Este proyecto es una **API** y **frontend** para gestionar el menú de McDonald's. Permite a los administradores crear, editar y eliminar ítems del menú, mientras que los usuarios pueden visualizar los productos disponibles. La aplicación está construida con **FastAPI** para el backend y **React** para el frontend.

---

## **Características**

### **Backend**
- **Framework**: FastAPI
- **Base de Datos**: MongoDB
- **Autenticación**: JWT (JSON Web Tokens)
- **Endpoints**:
  - Crear, leer, actualizar y eliminar ítems del menú.
  - Autenticación de administrador.
  - Registro de nuevos administradores.
- **Documentación Interactiva**: Swagger disponible en `/docs`.

### **Frontend**
- **Framework**: React
- **Diseño**: Estilo inspirado en McDonald's con colores y tipografía consistentes.
- **Páginas**:
  - Página principal para visualizar el menú.
  - Inicio de sesión para administradores.
  - Panel de administración para gestionar ítems del menú.
  - Formularios para crear y editar ítems.

---

## **Requisitos Previos**

### **Backend**
- Python 3.10 o superior
- MongoDB
- Dependencias de Python (instaladas con `pip`)

### **Frontend**
- Node.js 16 o superior
- npm o yarn

---

## **Instalación**

### **Clonar el Repositorio**
```bash
git clone https://github.com/tu-usuario/McDonaldsMenuAPI.git
cd McDonaldsMenuAPI