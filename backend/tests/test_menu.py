import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

# Datos de prueba
test_item = {
    "name": "Big Mac",
    "category": "Hamburguesa",
    "price": 5.99,
    "description": "Deliciosa hamburguesa con doble carne y queso.",
    "image_url": "https://ih1.redbubble.net/image.1756098780.0530/fpp,small,lustre,wall_texture,product,750x1000.jpg"
}

updated_item = {
    "name": "Big Mac Deluxe",
    "category": "Hamburguesa Premium",
    "price": 6.99,
    "description": "Actualización de descripción.",
    "image_url": "https://ih1.redbubble.net/image.1756098780.0530/fpp,small,lustre,wall_texture,product,750x1000.jpg"
}

@pytest.fixture(scope="module")
def auth_headers():
    # Autenticar un usuario de prueba y obtener el token de acceso
    login_data = {
        "username": "admin",  # Asegúrate de que este usuario exista en tu base de datos
        "password": "admin123"  # Asegúrate de que esta sea la contraseña correcta
    }
    response = client.post("/token", data=login_data, headers={"Content-Type": "application/x-www-form-urlencoded"})
    assert response.status_code == 200
    access_token = response.json()["access_token"]
    return {"Authorization": f"Bearer {access_token}"}

@pytest.fixture
def create_test_item(auth_headers):
    # Crear un ítem de prueba antes de cada prueba
    response = client.post("/menu/", json=test_item, headers=auth_headers)
    assert response.status_code == 200
    created_item = response.json()
    yield created_item  # Proporcionar el ítem creado a la prueba
    # Eliminar el ítem después de la prueba
    client.delete(f"/menu/{created_item['id']}", headers=auth_headers)

def test_create_menu_item(auth_headers):
    response = client.post("/menu/", json=test_item, headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["name"] == test_item["name"]
    assert response.json()["category"] == test_item["category"]
    assert response.json()["price"] == test_item["price"]

def test_create_menu_item_invalid_data(auth_headers):
    invalid_item = {
        "name": "",
        "category": "Hamburguesa",
        "price": -5.99  # Precio inválido
    }
    response = client.post("/menu/", json=invalid_item, headers=auth_headers)
    assert response.status_code == 422  # Error de validación

def test_get_all_menu_items(create_test_item):
    response = client.get("/menu/")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_get_menu_item_by_id(create_test_item):
    item_id = create_test_item["id"]
    response = client.get(f"/menu/{item_id}")
    assert response.status_code == 200
    assert response.json()["id"] == item_id

def test_get_menu_item_invalid_id():
    response = client.get("/menu/invalid_id")
    assert response.status_code == 400  # ID inválido

def test_update_menu_item(create_test_item, auth_headers):
    item_id = create_test_item["id"]
    response = client.put(f"/menu/{item_id}", json=updated_item, headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["name"] == updated_item["name"]
    assert response.json()["price"] == updated_item["price"]

def test_update_menu_item_invalid_id(auth_headers):
    response = client.put("/menu/invalid_id", json=updated_item, headers=auth_headers)
    assert response.status_code == 400  # ID inválido

def test_update_menu_item_not_found(auth_headers):
    response = client.put("/menu/64f1d0db1472a6dd4e0b9582", json=updated_item, headers=auth_headers)
    assert response.status_code == 404  # Ítem no encontrado

def test_delete_menu_item(create_test_item, auth_headers):
    item_id = create_test_item["id"]
    response = client.delete(f"/menu/{item_id}", headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["message"] == "Ítem eliminado correctamente"

    # Verificar que el ítem ya no existe
    response = client.get(f"/menu/{item_id}")
    assert response.status_code == 404

def test_delete_menu_item_invalid_id(auth_headers):
    response = client.delete("/menu/invalid_id", headers=auth_headers)
    assert response.status_code == 400  # ID inválido

def test_delete_menu_item_not_found(auth_headers):
    response = client.delete("/menu/64f1d0db1472a6dd4e0b9582", headers=auth_headers)
    assert response.status_code == 404  # Ítem no encontrado