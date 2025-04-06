from fastapi import APIRouter, HTTPException, Depends
from models import MenuItem, UpdateMenuItem
from database import menu_collection
from bson import ObjectId
from typing import List, Union
from auth import get_current_user, User
from pydantic import HttpUrl

router = APIRouter(
    prefix="/menu",
    tags=["menu"]
)

# Helper para convertir ObjectId a string
def menu_item_helper(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "category": item["category"],
        "price": item["price"],
        "description": item.get("description"),
        "image_url": item.get("image_url")  # Incluir el campo image_url
    }

# Crear uno o varios ítems en el menú (solo admin)
@router.post("/", response_model=Union[dict, List[dict]])
async def create_menu_item(
    items: Union[MenuItem, List[MenuItem]], 
    current_user: User = Depends(get_current_user)
):
    try:
        # Si es un solo objeto, lo convertimos en una lista para procesarlo uniformemente
        if isinstance(items, MenuItem):
            items = [items]

        created_items = []
        for item in items:
            # Convertir el modelo a un diccionario y convertir HttpUrl a str
            new_item = item.model_dump()
            if isinstance(new_item.get("image_url"), HttpUrl):
                new_item["image_url"] = str(new_item["image_url"])  # Convertir HttpUrl a str

            # Insertar en la base de datos
            result = menu_collection.insert_one(new_item)
            # Recuperar el ítem creado
            created_item = menu_collection.find_one({"_id": result.inserted_id})
            created_items.append(menu_item_helper(created_item))

        # Si solo se creó un ítem, devolverlo como un objeto
        if len(created_items) == 1:
            return created_items[0]

        # Si se crearon varios ítems, devolverlos como una lista
        return created_items

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear el ítem: {str(e)}")

# Leer todos los ítems del menú (accesible para todos)
@router.get("/", response_model=List[dict])
async def get_menu_items():
    items = menu_collection.find()
    return [menu_item_helper(item) for item in items]

# Leer un ítem específico por ID (accesible para todos)
@router.get("/{item_id}", response_model=dict)
async def get_menu_item(item_id: str):
    if not ObjectId.is_valid(item_id):
        raise HTTPException(status_code=400, detail="ID inválido")
    item = menu_collection.find_one({"_id": ObjectId(item_id)})
    if not item:
        raise HTTPException(status_code=404, detail="Ítem no encontrado")
    return menu_item_helper(item)

# Actualizar un ítem del menú (solo admin)
@router.put("/{item_id}", response_model=dict)
async def update_menu_item(item_id: str, item: UpdateMenuItem, current_user: User = Depends(get_current_user)):
    if not ObjectId.is_valid(item_id):
        raise HTTPException(status_code=400, detail="ID inválido")
    try:
        # Filtrar los campos que no son None y convertir HttpUrl a str
        updated_data = {k: (str(v) if isinstance(v, HttpUrl) else v) for k, v in item.model_dump().items() if v is not None}

        # Intentar actualizar el ítem en la base de datos
        result = menu_collection.update_one({"_id": ObjectId(item_id)}, {"$set": updated_data})
        if result.matched_count == 0:
            # Si no se encuentra el ítem, devolver un error 404
            raise HTTPException(status_code=404, detail="Ítem no encontrado")
        
        # Recuperar el ítem actualizado
        updated_item = menu_collection.find_one({"_id": ObjectId(item_id)})
        if not updated_item:
            raise HTTPException(status_code=404, detail="Ítem no encontrado después de la actualización")
        
        # Devolver el ítem actualizado
        return menu_item_helper(updated_item)
    except HTTPException as e:
        # Re-levantar errores HTTP específicos
        raise e
    except Exception as e:
        # Manejar otros errores y devolver un error 500
        raise HTTPException(status_code=500, detail=f"Error al actualizar el ítem: {str(e)}")
    
# Eliminar todos los ítems del menú (solo admin)
@router.delete("/all", response_model=dict)
async def delete_all_menu_items(current_user: User = Depends(get_current_user)):
    try:
        # Verificar que el usuario autenticado sea un administrador
        if not current_user:
            raise HTTPException(status_code=403, detail="No autorizado")

        # Eliminar todos los documentos de la colección
        result = menu_collection.delete_many({})
        return {"message": f"Se eliminaron {result.deleted_count} ítems del menú."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar los ítems: {str(e)}")

# Eliminar un ítem del menú (solo admin)
@router.delete("/{item_id}", response_model=dict)
async def delete_menu_item(item_id: str, current_user: User = Depends(get_current_user)):
    if not ObjectId.is_valid(item_id):
        raise HTTPException(status_code=400, detail="ID inválido")
    result = menu_collection.delete_one({"_id": ObjectId(item_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Ítem no encontrado")
    return {"message": "Ítem eliminado correctamente"}