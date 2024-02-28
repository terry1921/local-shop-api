# Servidor API para Tienda de Abarrotes

## Introducción

Este proyecto implementa un servidor API RESTful para una simulación de tienda de abarrotes usando Node.js y Express. Permite a los clientes interactuar con datos de productos y categorías almacenados en archivos JSON y gestionar un carrito de compras en memoria. La API soporta listar categorías y productos, filtrar productos por categoría, y añadir y recuperar ítems del carrito de compras.

## Instalación

### Prerrequisitos

- Node.js
- npm

### Configuración

- Clonar el repositorio
- Instalar dependencias
  ```sh
  npm install
  ```
- Iniciar el servidor
  ```sh
  node server.js
  ```

Este comando lanza el servidor en http://localhost:3000. Asegúrate de que el servidor esté en funcionamiento antes de intentar acceder a los puntos finales de la API.

## Ejecución con Docker

Para construir y ejecutar este servicio utilizando Docker, sigue los siguientes pasos:

### Construir la Imagen Docker

Primero, necesitas construir una imagen Docker a partir del Dockerfile. Asegúrate de estar en el directorio que contiene el `Dockerfile` y ejecuta el siguiente comando en la terminal:

```bash
  docker build -t api-abarrotes .
```

### Ejecutar el Contenedor

Una vez que la imagen se haya construido con éxito, puedes ejecutar un contenedor basado en esa imagen. Para hacerlo, utiliza el siguiente comando:

```bash
docker run -d -p 3000:3000 api-abarrotes
```

Este comando ejecuta el contenedor en modo "detached" (como un proceso en segundo plano) y mapea el puerto 3000 del contenedor al puerto 3000 de tu máquina local. Esto te permite acceder al servicio navegando a http://localhost:3000 en tu navegador.

## Uso

Aquí tienes algunos ejemplos de cómo interactuar con la API usando curl:

### Listar Categorías

Recuperar una lista de todas las categorías de productos.

```sh
curl http://localhost:3000/categories
```

### Listar Productos

Recuperar una lista de todos los productos, opcionalmente filtrados por categoría.

```sh
curl http://localhost:3000/products
```

Para filtrar por categoría, añade un parámetro de consulta, por ejemplo, ?category=1:

```sh
curl 'http://localhost:3000/products?category=1'
```

### Añadir al Carrito de Compras nuevo

Añade un producto al carrito de compras especificando el ID del producto y la cantidad.

```sh
curl -X POST http://localhost:3000/shopping-cart \
     -H "Content-Type: application/json" \
     -d '{"productId": "1", "quantity": 2}'
```

### Añadir al Carrito de Compras existente

Añade un producto al carrito de compras especificando el ID del producto, la cantidad y el cartId.

```sh
curl -X POST http://localhost:3000/shopping-cart \
     -H "Content-Type: application/json" \
     -d '{"productId": "1", "quantity": 2, "cartId": UUID}'
```

### Recuperar el Carrito de Compras

Obtén el contenido actual del carrito de compras, incluyendo los detalles de los ítems y el precio total.

```sh
curl http://localhost:3000/shopping-cart/<YOUR_CART_ID>
```

## Contribuciones

Las contribuciones a este proyecto son bienvenidas. Por favor, considera enviar una solicitud de extracción o abrir un problema para errores y solicitudes de funcionalidades.
