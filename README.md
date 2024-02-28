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
  ```
  npm install
  ```
- Iniciar el servidor
  ```
  node server.js
  ```

Este comando lanza el servidor en http://localhost:3000. Asegúrate de que el servidor esté en funcionamiento antes de intentar acceder a los puntos finales de la API.

## Uso

Aquí tienes algunos ejemplos de cómo interactuar con la API usando curl:

### Listar Categorías

Recuperar una lista de todas las categorías de productos.

```
curl http://localhost:3000/categories
```

### Listar Productos

Recuperar una lista de todos los productos, opcionalmente filtrados por categoría.

```
curl http://localhost:3000/products
```

Para filtrar por categoría, añade un parámetro de consulta, por ejemplo, ?category=1:

```
curl 'http://localhost:3000/products?category=1'
```

### Añadir al Carrito de Compras nuevo

Añade un producto al carrito de compras especificando el ID del producto y la cantidad.

```
curl -X POST http://localhost:3000/shopping-cart \
     -H "Content-Type: application/json" \
     -d '{"productId": "1", "quantity": 2}'
```

### Añadir al Carrito de Compras existente

Añade un producto al carrito de compras especificando el ID del producto, la cantidad y el cartId.

```
curl -X POST http://localhost:3000/shopping-cart \
     -H "Content-Type: application/json" \
     -d '{"productId": "1", "quantity": 2, "cartId": UUID}'
```

### Recuperar el Carrito de Compras

Obtén el contenido actual del carrito de compras, incluyendo los detalles de los ítems y el precio total.

```
curl http://localhost:3000/shopping-cart/<YOUR_CART_ID>
```

## Contribuciones

Las contribuciones a este proyecto son bienvenidas. Por favor, considera enviar una solicitud de extracción o abrir un problema para errores y solicitudes de funcionalidades.
