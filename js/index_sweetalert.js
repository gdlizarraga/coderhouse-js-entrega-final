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
  let listaProductos =
    '<div style="text-align:left;font-size:18px">Elige un producto:</div>';
  productos.forEach((producto) => {
    listaProductos += `<div style="text-align:left;font-size:14px;font-weight:normal">${producto.id}. ${producto.nombre} - $${producto.precio}</div>`;
  });

  let productoId;

  let cantidad;

  Swal.fire({
    title: listaProductos,
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Agregar",
    cancelButtonText: "Salir",
    showLoaderOnConfirm: true,
    preConfirm: async (data) => {
      productoId = parseInt(data);
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      let producto = productos.find((p) => p.id === productoId);

      if (producto) {
        Swal.fire({
          title: `<div style="text-align:left;font-size:18px">¿Cuántas unidades de ${producto.nombre} quieres?</div>`,
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Agregar",
          cancelButtonText: "Salir",
          showLoaderOnConfirm: true,
          preConfirm: async (data) => {
            cantidad = parseInt(data);
          },
          allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
          if (result.isConfirmed) {
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

              Swal.fire({
                title: "Información",
                text: "¿Quieres agregar otro producto?",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si",
                cancelButtonText: "No",
              }).then((result) => {
                if (result.isConfirmed) {
                  elegirProducto();
                } else {
                  mostrarCarrito();
                }
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Cantidad no válida. Inténtalo de nuevo!",
                icon: "error",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Continuar Elección",
                cancelButtonText: "Salir Carrito",
              }).then((result) => {
                if (result.isConfirmed) {
                  elegirProducto();
                }
              });
            }
          }
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Producto no válido. Inténtalo de nuevo!",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Continuar Elección",
          cancelButtonText: "Salir Carrito",
        }).then((result) => {
          if (result.isConfirmed) {
            elegirProducto();
          }
        });
      }
    }
  });
}

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
  if (carrito.length > 0) {
    let mensajeCarrito =
      '<div style="text-align:left;font-size:18px">Lista de Productos agregados al carrito:</div>';
    mensajeCarrito += '<table class="table">';
    mensajeCarrito +=
      '<thead class="table-dark"><tr><th style="text-align:left;">Producto</th><th style="text-align:right;">Cantidad</th><th style="text-align:right;">Precio</th><th style="text-align:right;">Total</th></tr></thead>';
    mensajeCarrito += "<tbody>";
    carrito.forEach((item) => {
      mensajeCarrito += `<tr style="text-align:left;font-size:14px;font-weight:normal">`;
      mensajeCarrito += `<td>${item.producto}</td>`;
      mensajeCarrito += `<td style="text-align:right;">${item.cantidad}</td>`;
      mensajeCarrito += `<td style="text-align:right;">${item.precio}</td>`;
      mensajeCarrito += `<td style="text-align:right;">$${
        item.precio * item.cantidad
      }</td>`;
      mensajeCarrito += `</tr>`;
    });
    mensajeCarrito += "</tbody>";
    mensajeCarrito += "</table>";

    Swal.fire({
      title: "Detalle Carrito!",
      width: 800,
      html: mensajeCarrito,
      icon: "success",
    });
  } else {
    Swal.fire({
      title: "Informacion!",
      text: "Tu carrito está vacío!",
      icon: "info",
    });
  }
}

// Iniciar la elección de productos
$(document).ready(function () {
  elegirProducto();
});
