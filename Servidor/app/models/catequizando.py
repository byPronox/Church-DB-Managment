from app.db import get_connection
from bson.objectid import ObjectId
import json

def convert_objectid_to_str(obj):
    """Convierte recursivamente ObjectIds a strings en un objeto"""
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {key: convert_objectid_to_str(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_objectid_to_str(item) for item in obj]
    else:
        return obj

class Catequizando:
    def __init__(self, data):
        self.nombres = data.get('nombres')
        self.apellidos = data.get('apellidos')
        self.contacto = data.get('contacto')
        # Manejar ambos formatos de fecha_nacimiento
        self.fecha_nacimiento = data.get('fecha_nacimiento') or data.get('fechaNacimiento')
        # Manejar ambos formatos de fe_bautismo
        self.fe_bautismo = data.get('fe_bautismo') if data.get('fe_bautismo') is not None else data.get('feBautismo')
        self.inscripciones = data.get('inscripciones', [])
        self.sacramentos = data.get('sacramentos', [])

    @staticmethod
    def get_all():
        db = get_connection()
        catequizandos_collection = db['catequizandos']  # Nombre exacto de la colección
        try:
            # Fetch all documents and convert ObjectId to string for JSON serialization
            catequizandos = catequizandos_collection.find()
            result = []
            for catequizando in catequizandos:
                # Convertir todos los ObjectIds a strings recursivamente
                catequizando_serializable = convert_objectid_to_str(catequizando)
                result.append(catequizando_serializable)
            return result
        except Exception as e:
            raise Exception(f"Error fetching catequizandos: {str(e)}")

    @staticmethod
    def get_by_id(catequizando_id):
        db = get_connection()
        catequizandos_collection = db['catequizandos']  # Nombre exacto de la colección
        catequizando = catequizandos_collection.find_one({"_id": ObjectId(catequizando_id)})
        if catequizando:
            return convert_objectid_to_str(catequizando)
        return None

    def create(self):
        db = get_connection()
        catequizandos_collection = db['catequizandos']  # Nombre exacto de la colección
        try:
            result = catequizandos_collection.insert_one({
                "nombres": self.nombres,
                "apellidos": self.apellidos,
                "contacto": self.contacto,
                "fecha_nacimiento": self.fecha_nacimiento,
                "fe_bautismo": self.fe_bautismo,
                "inscripciones": self.inscripciones,
                "sacramentos": self.sacramentos
            })
            return str(result.inserted_id), None
        except Exception as e:
            return None, str(e)

    def update(self, catequizando_id):
        db = get_connection()
        catequizandos_collection = db['catequizandos']  # Nombre exacto de la colección
        try:
            catequizandos_collection.update_one(
                {"_id": ObjectId(catequizando_id)},
                {"$set": {
                    "nombres": self.nombres,
                    "apellidos": self.apellidos,
                    "contacto": self.contacto,
                    "fecha_nacimiento": self.fecha_nacimiento,
                    "fe_bautismo": self.fe_bautismo,
                    "inscripciones": self.inscripciones,
                    "sacramentos": self.sacramentos
                }}
            )
            return True, None
        except Exception as e:
            return False, str(e)

    @staticmethod
    def delete(catequizando_id):
        db = get_connection()
        catequizandos_collection = db['catequizandos']  # Nombre exacto de la colección
        try:
            catequizandos_collection.delete_one({"_id": ObjectId(catequizando_id)})
            return True, None
        except Exception as e:
            return False, str(e)