import os
import pyodbc

def get_connection():
    CONTROLADOR_ODBC = 'ODBC Driver 17 for SQL Server'
    NAME_SERVER = os.getenv('SQL_SERVER_HOST', 'UPOAULA10614')  # Usa 'sqlserver' en el contenedor
    DATABASE = os.getenv('SQL_SERVER_DB', 'Iglesia')
    USERNAME = os.getenv('SQL_SERVER_USER', 'pythonconect')
    PASSWORD = os.getenv('SQL_SERVER_PASSWORD', 'UDLA')

    CONNECTION_STRING = (
        f'DRIVER={CONTROLADOR_ODBC};'
        f'SERVER={NAME_SERVER};'
        f'DATABASE={DATABASE};'
        f'UID={USERNAME};'
        f'PWD={PASSWORD}'
    )

    return pyodbc.connect(CONNECTION_STRING)