from app.db import get_connection
from bson.objectid import ObjectId

class Catequizando:
    def __init__(self, data):
        self.nombres = data.get('nombres')
        self.apellidos = data.get('apellidos')
        self.contacto = data.get('contacto')
        self.fecha_nacimiento = data.get('fechaNacimiento')
        self.fe_bautismo = data.get('feBautismo')
        self.inscripciones = data.get('inscripciones', [])
        self.sacramentos = data.get('sacramentos', [])

    @staticmethod
    def get_all():
        db = get_connection()
        catequizandos_collection = db['Catequizandos']
        try:
            # Fetch all documents and convert ObjectId to string for JSON serialization
            catequizandos = catequizandos_collection.find()
            return [
                {
                    "_id": str(catequizando["_id"]),
                    "nombres": catequizando["nombres"],
                    "apellidos": catequizando["apellidos"],
                    "contacto": catequizando["contacto"],
                    "fecha_nacimiento": catequizando["fecha_nacimiento"],
                    "fe_bautismo": catequizando["fe_bautismo"],
                    "inscripciones": catequizando["inscripciones"],
                    "sacramentos": catequizando["sacramentos"],
                }
                for catequizando in catequizandos
            ]
        except Exception as e:
            raise Exception(f"Error fetching catequizandos: {str(e)}")

    @staticmethod
    def get_by_id(catequizando_id):
        db = get_connection()
        catequizandos_collection = db['Catequizandos']
        return catequizandos_collection.find_one({"_id": ObjectId(catequizando_id)})

    def create(self):
        db = get_connection()
        catequizandos_collection = db['Catequizandos']
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
        catequizandos_collection = db['Catequizandos']
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
        catequizandos_collection = db['Catequizandos']
        try:
            catequizandos_collection.delete_one({"_id": ObjectId(catequizando_id)})
            return True, None
        except Exception as e:
            return False, str(e)