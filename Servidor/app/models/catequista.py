from app.db import get_connection
from bson.objectid import ObjectId

class Catequista:
    def __init__(self, data):
        self.nombres = data.get('nombres')
        self.apellidos = data.get('apellidos')
        self.rol = data.get('rol')
        self.contacto = data.get('contacto')

    @staticmethod
    def get_all():
        db = get_connection()
        catequistas_collection = db['catequistas']  # Ensure the collection name matches
        try:
            catequistas = catequistas_collection.find()
            return [
                {
                    "_id": str(catequista["_id"]),
                    "nombres": catequista["nombres"],
                    "apellidos": catequista["apellidos"],
                    "rol": catequista["rol"],
                    "contacto": catequista["contacto"],
                }
                for catequista in catequistas
            ]
        except Exception as e:
            raise Exception(f"Error fetching catequistas: {str(e)}")

    @staticmethod
    def get_by_id(catequista_id):
        db = get_connection()
        catequistas_collection = db['catequistas']
        try:
            catequista = catequistas_collection.find_one({"_id": ObjectId(catequista_id)})
            if catequista:
                catequista["_id"] = str(catequista["_id"])  # Convert ObjectId to string
                return catequista
            return None
        except Exception as e:
            raise Exception(f"Error fetching catequista by ID: {str(e)}")

    def create(self):
        db = get_connection()
        catequistas_collection = db['catequistas']
        try:
            result = catequistas_collection.insert_one({
                "nombres": self.nombres,
                "apellidos": self.apellidos,
                "rol": self.rol,
                "contacto": self.contacto,
            })
            return str(result.inserted_id), None
        except Exception as e:
            return None, str(e)

    def update(self, catequista_id):
        db = get_connection()
        catequistas_collection = db['catequistas']
        try:
            catequistas_collection.update_one(
                {"_id": ObjectId(catequista_id)},
                {"$set": {
                    "nombres": self.nombres,
                    "apellidos": self.apellidos,
                    "rol": self.rol,
                    "contacto": self.contacto,
                }}
            )
            return True, None
        except Exception as e:
            return False, str(e)

    @staticmethod
    def delete(catequista_id):
        db = get_connection()
        catequistas_collection = db['catequistas']
        try:
            catequistas_collection.delete_one({"_id": ObjectId(catequista_id)})
            return True, None
        except Exception as e:
            return False, str(e)