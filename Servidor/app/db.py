import pyodbc

def get_connection():
    CONTROLADOR_ODBC = 'ODBC Driver 17 for SQL Server'
    NAME_SERVER = 'localhost'
    DATABASE = 'Iglesia'
    USERNAME = 'pythonconect'
    PASSWORD = 'UDLA'

    CONNECTION_STRING = (
        f'DRIVER={CONTROLADOR_ODBC};'
        f'SERVER={NAME_SERVER};'
        f'DATABASE={DATABASE};'
        f'UID={USERNAME};'
        f'PWD={PASSWORD}'
    )

    return pyodbc.connect(CONNECTION_STRING)