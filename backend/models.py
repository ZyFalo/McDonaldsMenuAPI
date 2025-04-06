from pydantic import BaseModel, Field, HttpUrl
from typing import Optional

class MenuItem(BaseModel):
    name: str = Field(..., json_schema_extra={"example": "Big Mac"})
    category: str = Field(..., json_schema_extra={"example": "Hamburguesa"})
    price: float = Field(..., gt=0, json_schema_extra={"example": 5.99})
    description: Optional[str] = Field(None, json_schema_extra={"example": "Deliciosa hamburguesa con doble carne y queso."})
    image_url: Optional[HttpUrl] = Field(None, json_schema_extra={"example": "https://example.com/image.jpg"})  # Campo para la URL de la imagen

class UpdateMenuItem(BaseModel):
    name: Optional[str] = Field(None, json_schema_extra={"example": "Big Mac Deluxe"})
    category: Optional[str] = Field(None, json_schema_extra={"example": "Hamburguesa"})
    price: Optional[float] = Field(None, gt=0, json_schema_extra={"example": 6.99})
    description: Optional[str] = Field(None, json_schema_extra={"example": "Actualización de descripción."})
    image_url: Optional[HttpUrl] = Field(None, json_schema_extra={"example": "https://example.com/image.jpg"})  # Campo para la URL de la imagen