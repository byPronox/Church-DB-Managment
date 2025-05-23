# filepath: /c:/Users/laboratorio/Desktop/Church-DB-Managment/Servidor/Dockerfile
# Usar una imagen base de Python
FROM python:3.9-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el resto del código fuente
COPY . .

# Instalar las dependencias directamente
RUN pip install --no-cache-dir flask flask-cors pyodbc

# Exponer el puerto 5000
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["python", "run.py"]