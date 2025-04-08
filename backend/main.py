from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from .auth import authenticate_user, create_access_token, User, Token, hash_password
from routers import menu
from database import db

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permitir solicitudes desde el frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Incluir los routers
app.include_router(menu.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API del menú de McDonald's"}

# Endpoint para login
@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# #Endpoint para registrar al administrador (solo accesible si ya hay un administrador autenticado)
# @app.post("/register-admin", response_model=dict)
# async def register_admin(new_user: User, current_user: User = Depends(get_current_user)):
#     # Verificar si ya existe un administrador
#     if db["users"].find_one({"username": new_user.username}):
#         raise HTTPException(status_code=400, detail="El administrador ya existe")
#     # Hashear la contraseña y guardar al administrador
#     hashed_password = hash_password(new_user.password)
#     db["users"].insert_one({
#         "username": new_user.username,
#         "password": hashed_password
#     })
#     return {"message": "Administrador registrado exitosamente"}

@app.post("/register-admin", response_model=dict)
async def register_admin(new_user: User):
    # Verificar si ya existe un administrador
    if db["users"].find_one({"username": new_user.username}):
        raise HTTPException(status_code=400, detail="El administrador ya existe")
    # Hashear la contraseña y guardar al administrador
    hashed_password = hash_password(new_user.password)
    db["users"].insert_one({
        "username": new_user.username,
        "password": hashed_password
    })
    return {"message": "Administrador registrado exitosamente"}