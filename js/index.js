// Lista de productos disponibles
const productos = [
  { id: 1, nombre: "Reloj Smart Pro", precio: 199.0 },
  { id: 2, nombre: "Auriculares Wireless", precio: 149.0 },
  { id: 3, nombre: "Cámara Retro X100", precio: 299.0 },
  { id: 4, nombre: "Smartphone Ultra", precio: 599.0 },
];

// Array para almacenar las elecciones del usuario
let carrito = [];

// Función para mostrar la lista de productos y pedir la elección del usuario
function elegirProducto() {
  let listaProductos = "Elige un producto:\n";
  productos.forEach((producto) => {
    listaProductos += `${producto.id}. ${producto.nombre} - $${producto.precio}\n`;
  });

  let productoId = parseInt(prompt(listaProductos));
  let producto = productos.find((p) => p.id === productoId);

  if (producto) {
    let cantidad = parseInt(
      prompt(`¿Cuántas unidades de ${producto.nombre} quieres?`)
    );
    if (cantidad > 0) {
      let itemCarrito = carrito.find(
        (item) => item.producto === producto.nombre
      );
      if (itemCarrito) {
        itemCarrito.cantidad += cantidad;
      } else {
        carrito.push({
          producto: producto.nombre,
          cantidad: cantidad,
          precio: producto.precio,
        });
      }

      if (confirm("¿Quieres agregar otro producto?")) {
        elegirProducto();
      } else {
        mostrarCarrito();
      }
    } else {
      alert("Cantidad no válida. Inténtalo de nuevo.");
      elegirProducto();
    }
  } else {
    alert("Producto no válido. Inténtalo de nuevo.");
    elegirProducto();
  }
}

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
  if (carrito.length > 0) {
    let mensajeCarrito = "Tu carrito de compras:\n";
    carrito.forEach((item) => {
      mensajeCarrito += `${item.cantidad} x ${item.producto} - $${
        item.precio * item.cantidad
      }\n`;
    });
    alert(mensajeCarrito);
  } else {
    alert("Tu carrito está vacío.");
  }
}

// Iniciar la elección de productos
$(document).ready(function () {
  elegirProducto();
});
