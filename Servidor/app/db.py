from pymongo import MongoClient

def get_connection():
    CONNECTION_STRING = "mongodb+srv://admin:admin@iglesiacluster.a3pa34m.mongodb.net/"
    client = MongoClient(CONNECTION_STRING)
    db = client['Iglesia'] 
    return db