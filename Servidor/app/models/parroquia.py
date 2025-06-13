from app.db import get_connection
from bson.objectid import ObjectId

class Parroquia:
    def __init__(self, data):
        self.nombre = data.get('nombre')
        self.telefono = data.get('telefono')
        self.direccion = data.get('direccion', {})
        self.niveles_catequesis = data.get('niveles_catequesis', [])

    @staticmethod
    def get_all():
        db = get_connection()
        parroquias_collection = db['Parroquias']
        try:
            parroquias = parroquias_collection.find()
            return [
                {
                    "_id": str(parroquia["_id"]),
                    "nombre": parroquia["nombre"],
                    "telefono": parroquia["telefono"],
                    "direccion": parroquia["direccion"],
                    "niveles_catequesis": parroquia["niveles_catequesis"],
                }
                for parroquia in parroquias
            ]
        except Exception as e:
            raise Exception(f"Error fetching parroquias: {str(e)}")

    @staticmethod
    def get_by_id(parroquia_id):
        db = get_connection()
        parroquias_collection = db['Parroquias']
        return parroquias_collection.find_one({"_id": ObjectId(parroquia_id)})

    def create(self):
        db = get_connection()
        parroquias_collection = db['Parroquias']
        try:
            result = parroquias_collection.insert_one({
                "nombre": self.nombre,
                "telefono": self.telefono,
                "direccion": self.direccion,
                "niveles_catequesis": self.niveles_catequesis,
            })
            return str(result.inserted_id), None
        except Exception as e:
            return None, str(e)

    def update(self, parroquia_id):
        db = get_connection()
        parroquias_collection = db['Parroquias']
        try:
            parroquias_collection.update_one(
                {"_id": ObjectId(parroquia_id)},
                {"$set": {
                    "nombre": self.nombre,
                    "telefono": self.telefono,
                    "direccion": self.direccion,
                    "niveles_catequesis": self.niveles_catequesis,
                }}
            )
            return True, None
        except Exception as e:
            return False, str(e)

    @staticmethod
    def delete(parroquia_id):
        db = get_connection()
        parroquias_collection = db['Parroquias']
        try:
            parroquias_collection.delete_one({"_id": ObjectId(parroquia_id)})
            return True, None
        except Exception as e:
            return False, str(e)