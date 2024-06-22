# Hackathon 2: Ecommerce de Tecnología 🛒💻

¡Bienvenidos a la Hackathon 2 del curso Desarrollo Basado en Plataformas! En esta ocasión, construiremos una aplicación web que simula un ecommerce de productos tecnológicos, inspirado en Amazon. 📦🛍️

## Objetivos 🎯

1. 🔐 Implementar un sistema de autenticación con enrutamiento en React.
2. 🚚 Practicar el paso de props de un componente padre a hijo.
3. ♾️ Desarrollar un componente de scroll infinito.
4. 🛒 Crear un carrito de compras con operaciones CRUD.
5. 🔄 Implementar operaciones CRUD para cada producto.
6. 🚀 Desplegar el front-end en Google Firebase utilizando Github Actions.

## Funcionalidades 🔧

### Roles de Usuario 👥

Habrá dos roles de usuario: Administrador (`admin`)y Cliente(`client`).

#### Administrador 👨‍💼

- Podrá realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos.
- No tendrá acceso al carrito de compras.
- Tendrá una vista separada con una tabla que muestra todos los productos y las opciones CRUD.

#### Cliente 👤

- Podrá ver y agregar productos al carrito de compras.
- No podrá realizar operaciones CRUD sobre los productos.
- Tendrá acceso al carrito de compras en la parte superior derecha de la pantalla.

### Productos 📦

- Los productos se mostrarán en un componente de scroll infinito con paginación.
- Cada producto mostrará su imagen, nombre, precio, puntuación de reseña y un botón para añadir al carrito.
- Al hacer clic en un producto, se abrirá una página con detalles adicionales y la opción de añadir al carrito.

### Carrito de Compras 🛒

- El carrito de compras se mostrará como un icono en la parte superior derecha de la pantalla.
- Al hacer clic, se abrirá un modal que mostrará los productos añadidos al carrito.
- En este modal, el usuario podrá eliminar productos del carrito y realizar la compra.
- Después de realizar la compra, se mostrará un spinner de carga durante 5 segundos y luego un modal de confirmación.

### Autenticación 🔐

- Los usuarios no autenticados tendrán una vista similar a la de los clientes, pero sin acceso al carrito de compras.
- Se mostrará un botón de inicio de sesión y registro.
- Después de iniciar sesión o registrarse, se mostrará un modal de bienvenida y se habilitará el acceso al carrito de compras.

### Despliegue 🚀

- El front-end deberá ser desplegado en Google Firebase utilizando Github Actions, como se ha enseñado en clase.

## Documentación API 📚

Pueden acceder a los endpoints de la API en el siguiente enlace: https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/

Para esta Hackathon, utilizaremos una API RESTful que proporciona información sobre los productos.

🔓: Enpoints publicos
🔐: Enpoints que necesitan autorización

#### Crear un nuevo usuario (`POST auth/register`) 🔓

- `request body`: 
  - `username`: Nombre de usuario
  - `password`: Contraseña
  - `role`: Rol del usuario (Admin o Cliente)

#### Autenticar un usuario (`POST auth/login`) 🔓
- `request body`: 
  - `username`: Nombre de usuario
  - `password`: Contraseña

#### Crear un item (`POST /items` ) 🔐

- Solo disponible para usuarios con rol `admin`.
- `request body`: 
  - boughtInLastMonth:Integer, cantidad de compras en el último mes
  - imgUrl:String, url de la imagen
  - isBestSeller:Boolean, si pertenece a los más vendidos
  - price:Double, precio del producto
  - stars:Integer, puntuación del producto de 0 a 5
  - title:String, nombre del producto
- Todos los campos son requeridos.
- Devuelve un `itemId` y un mensaje de éxito.

#### Editar un item (`PUT /items`) 🔐
- Solo disponible para usuarios con rol `admin`.
- `request body`: 
  - `itemId`:String, id del item
  - `boughtInLastMonth`:Integer, cantidad de compras en el último mes
  - `imgUrl`:String, url de la imagen
  - `isBestSeller`:Boolean, si pertenece a los más vendidos
  - `price`:Double, precio del producto
  - `stars`:Integer, puntuación del producto de 0 a 5
  - `title`:String, nombre del producto
- Todos los campos son requeridos, incluso si no se van a modificar.

#### Eliminar un item (`DELETE /item/{id}`) 🔐

- Solo disponible para usuarios con rol `admin`.
- Recibe un parametro de ruta `id` que representa el itemId del item a eliminar.
- Devuelve un mensaje de éxito.

#### Obtener un item (`GET /item/{id}`) 🔐
- Disponible para usuarios autenticados con cualquier rol.
- Recibe un parametro de ruta `id` que representa el itemId del item a obtener.
- Devuelve un objeto con la información del item.
- El campo denominado `ansi` es el id del item.


#### Obtener Items con paginación (`GET /items?limit={limit}&lastKey={lastKey}`) 🔓
Recibe los siguientes parametros de query:
  - `limit`: Cantidad de items a obtener.
  - `lastKey`: Clave de paginación para obtener los siguientes items. **Puede ser nulo**
- Devuelve un arreglo de items y la última clave de paginación(`lastKey`).

#### Hacer la compra de un carrito (`POST /buy`) 🔐

- Se necesita el rol `client` para poder ejecutar esta operación.
- `request body`: 
  - `userId`:String, id del usuario
- Devuelve un mensaje de éxito. Y el carrito del cliente se vacía.

#### Agregar un item al carrito (`POST /cart`) 🔐

- Se necesita el rol `client` para poder ejecutar esta operación.
- `request body`: 
  - `itemId`:String, id del item
  - `userId`:String, id del usuario
- Devuelve un mensaje de éxito.
- Si el item ya está en el carrito, se incrementa la cantidad.

#### Eliminar un item del carrito (`DELETE /cart`) 🔐

- Se necesita el rol `client` para poder ejecutar esta operación.
- `request body`: 
  - `itemId`:String, id del item
  - `userId`:String, id del usuario
- Si la cantidad del item es mayor a 1, se decrementa la cantidad.
- Si la cantidad del item es 1, se elimina del carrito.

#### Obtener el carrito de un usuario (`GET /cart/{userId}`) 🔐

- Se necesita el rol `client` para poder ejecutar esta operación.
- Recibe un parametro de ruta `userId` que representa el id del usuario.
- Devuelve un arreglo de de objetos que contiene el `itemId` y la cantidad `qty`.

¡Buena suerte y disfruten de esta emocionante Hackathon! 🎉💪