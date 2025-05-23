FROM node:16-alpine

WORKDIR /app

# Copiar solo el archivo package.json
COPY package.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]