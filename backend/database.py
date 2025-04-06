from pymongo import MongoClient
import os

# URI de conexión a MongoDB Atlas (reemplaza con tu URI)
MONGO_URI = "mongodb+srv://williampena:1006506574@cluster0.zgcor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Conexión al cliente MongoDB
client = MongoClient(MONGO_URI)

# Selección de la base de datos
db = client["mcdonalds_menu"]

# Selección de la colección
menu_collection = db["menu"]