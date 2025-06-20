from app.db import get_connection
from datetime import datetime
from bson.objectid import ObjectId

def insert_sample_data():
    """Inserta datos de ejemplo en la base de datos MongoDB"""
    db = get_connection()
    
    # Insertar datos en parroquias
    parroquias_collection = db['parroquias']
    
    # Insertar parroquia de ejemplo
    parroquia_data = {
        "nombre": "Parroquia San Juan Bautista",
        "telefono": "0987654321",
        "direccion": {
            "calle": "Calle Principal 123",
            "ciudad": "Quito"
        },
        "niveles_catequesis": [
            {
                "nivel_id": ObjectId("684397a04e3ae22cd05296d4"),
                "nombre_nivel": "Primera Comunión",
                "orden": "1",
                "fechas": {
                    "inicio": datetime(2025, 8, 1),
                    "fin": datetime(2025, 12, 15)
                },
                "catequistas_ids": [ObjectId("684397a04e3ae22cd05296d3")]
            }
        ]
    }
    
    # Verificar si ya existe la parroquia
    existing_parroquia = parroquias_collection.find_one({"nombre": "Parroquia San Juan Bautista"})
    if not existing_parroquia:
        parroquia_result = parroquias_collection.insert_one(parroquia_data)
        parroquia_id = parroquia_result.inserted_id
        print(f"Parroquia insertada con ID: {parroquia_id}")
    else:
        parroquia_id = existing_parroquia["_id"]
        print(f"Parroquia ya existe con ID: {parroquia_id}")
    
    # Insertar catequista de ejemplo
    catequistas_collection = db['catequistas']
    catequista_data = {
        "nombres": "María",
        "apellidos": "González",
        "rol": "Catequista Principal",
        "contacto": "0999888777"
    }
    
    existing_catequista = catequistas_collection.find_one({"nombres": "María", "apellidos": "González"})
    if not existing_catequista:
        catequista_result = catequistas_collection.insert_one(catequista_data)
        catequista_id = catequista_result.inserted_id
        print(f"Catequista insertado con ID: {catequista_id}")
    else:
        catequista_id = existing_catequista["_id"]
        print(f"Catequista ya existe con ID: {catequista_id}")
    
    # Insertar catequizando de ejemplo
    catequizandos_collection = db['catequizando']
    
    catequizando_data = {
        "nombres": "Juan",
        "apellidos": "Pérez",
        "fecha_nacimiento": datetime(2016, 5, 20),
        "contacto": "0987654321",
        "fe_bautismo": True,
        "sacramentos": [
            {
                "tipo_sacramento": "Bautismo",
                "fecha": datetime(2016, 12, 15),
                "lugar": "Parroquia San Juan Bautista"
            }
        ],
        "inscripciones": [
            {
                "inscripcion_id": ObjectId("684397b24e3ae22cd05296da"),
                "parroquia_id": parroquia_id,
                "nivel_id": ObjectId("684397a04e3ae22cd05296d4"),
                "fecha_inscripcion": datetime(2025, 8, 15),
                "estado": "Activo",
                "certificado_emitido": False,
                "asistencias": [
                    {
                        "fecha": datetime(2025, 9, 8),
                        "presente": True
                    },
                    {
                        "fecha": datetime(2025, 9, 15),
                        "presente": True
                    },
                    {
                        "fecha": datetime(2025, 9, 22),
                        "presente": False
                    }
                ],
                "evaluacion": {
                    "calificacion": 9.5,
                    "observaciones": "Participa activamente en clase."
                }
            }
        ]
    }
    
    # Verificar si ya existe el catequizando
    existing_catequizando = catequizandos_collection.find_one({"nombres": "Juan", "apellidos": "Pérez"})
    if not existing_catequizando:
        catequizando_result = catequizandos_collection.insert_one(catequizando_data)
        catequizando_id = catequizando_result.inserted_id
        print(f"Catequizando insertado con ID: {catequizando_id}")
    else:
        print(f"Catequizando ya existe con ID: {existing_catequizando['_id']}")
    
    print("Datos de ejemplo insertados correctamente!")

if __name__ == "__main__":
    insert_sample_data()
