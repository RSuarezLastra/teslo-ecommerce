# Descripción 

E-commerce Teslo, clon de la tienda de tesla.

## Correr en dev

1. Clonar el repositorio
2. Crear una copia del ```.env-template``` y nombrarlo a  ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias ```npm install```
4. Levantar la base de datos  ```docker compose up -d```
5. Ejecutar las migraciones  ```npx prisma migrate dev```
6. Ejecutar nuestro seed  ```npm run seed```
7. Correr el proyecto ```npm run dev```
8. Limpiar localstorage



## Correr en prod