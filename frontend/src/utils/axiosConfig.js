import axios from "axios";

const API_URL = "https://mcdonaldsmenuapi-production.up.railway.app";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para agregar el token JWT a las solicitudes
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Obtén el token del almacenamiento local
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;