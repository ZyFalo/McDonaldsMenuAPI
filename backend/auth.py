from pydantic import BaseModel
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timezone, timedelta
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from database import db  # Importa la conexión a MongoDB

# Configuración del hashing de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Configuración de JWT
SECRET_KEY = "McDonaldsKey" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Esquema para el token
class Token(BaseModel):
    access_token: str
    token_type: str

# Esquema para el usuario
class User(BaseModel):
    username: str
    password: str

# Dependencia para obtener el token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Función para verificar contraseñas
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Función para hashear contraseñas
def hash_password(password: str):
    return pwd_context.hash(password)

# Función para autenticar al administrador
def authenticate_user(username: str, password: str):
    user = db["users"].find_one({"username": username})  # Busca al usuario en MongoDB
    if not user or not verify_password(password, user["password"]):
        return None
    return User(username=user["username"], password=user["password"])

# Función para crear un token JWT
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Función para obtener el usuario actual a partir del token
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Token inválido")
        user = db["users"].find_one({"username": username})  # Busca al usuario en MongoDB
        if user is None:
            raise HTTPException(status_code=401, detail="Usuario no encontrado")
        return User(username=user["username"], password=user["password"])
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")