# API REST de usuarios con Node.js y TypeScript

Este proyecto es una API REST diseñada para gestionar usuarios utilizando Node.js y TypeScript. La API permite crear, obtener, actualizar y eliminar usuarios, con almacenamiento en memoria y validaciones básicas. También incluye pruebas unitarias y documentación con Swagger.

## Índice

- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Ejemplos de uso de los endpoints](#ejemplos-de-uso-de-los-endpoints)

## Tecnologías

- Node.js
- TypeScript
- Express
- Swagger para documentación
- Jest para pruebas unitarias
- Docker para contenerización

## Instalación

Para instalar y ejecutar el proyecto, sigue estos pasos:

### Modo Desarrollo

1. Clona el repositorio:
    ```bash
    git clone https://github.com/BrunoR98/user-api.git
    ```

2. Navega al directorio del proyecto.

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Ejecuta el proyecto en modo desarrollo con nodemon:
    ```bash
    npm run dev
    ```

5. Para ejecutar las pruebas unitarias, usa:
    ```bash
    npm run test
    ```

### Modo Producción con Docker

1. Construye y ejecuta el contenedor en modo detach (background):
    ```bash
    docker-compose up -d
    ```

2. Verifica que el contenedor esté corriendo (user-api-container):
    ```bash
    docker ps
    ```

3. Si necesitas detener el contenedor, usa:
    ```bash
    docker-compose down
    ```

Alternativamente, puedes ejecutar el archivo `start.sh` que contiene el comando para construir y ejecutar el contenedor:

```bash
./start.sh
```

y para detener la ejecución.

```bash
./stop.sh
```

### Ejemplos de uso de los endpoints

## Crear un usuario.

### POST 
```
http://localhost:3000/api/users
```
### body
```
{
    "name": "Testing",
    "email": "testing@gmail.com",
    "age": 20
}
```

## Obtener la lista de usuarios.

### GET
```
http://localhost:3000/api/users
```

## Obtener el usuario que se creo anteriormente.

### GET
```
http://localhost:3000/api/users/1
```

## Actualizar todas las propiedades de un usuario.

### PUT
```
http://localhost:3000/api/users/1
```
### body
```
{
    "name": "Testing2",
    "email": "testing2@gmail.com",
    "age": 25
}
```

## Actualizar algunas propiedades de un usuario.

### PATCH
```
http://localhost:3000/api/users/1
```
### body
```
{
    "email": "production@gmail.com",
}
```

## Elimina el usuario creado anteriormente.

### DELETE
```
http://localhost:3000/api/users/1
```


