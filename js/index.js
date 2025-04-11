// Lista de productos disponibles
const productos = [
  {
    id: 1,
    nombre: "Reloj Smart Pro",
    descripcion:
      "El Reloj Smart Pro es el smartwatch ideal para quienes buscan funcionalidad, diseño y rendimiento en un solo dispositivo. Con una pantalla AMOLED de alta resolución, monitoreo de salud y conectividad avanzada, es el complemento perfecto para tu día a día. ",
    precio: 199.0,
    imagen: "producto1",
    actualizacion: "Ultima actualizacion 3 min atras",
  },
  {
    id: 2,
    nombre: "Auriculares Wireless",
    descripcion:
      "Audio de alta calidad con bajos potentes y agudos nítidos. Bluetooth 5.0 para conexión estable y sin cortes. Batería de larga duración, ideal para todo el día. Diseño ergonómico y ligero para máxima comodidad. Resistentes al agua, perfectos para entrenar. Micrófono incorporado para llamadas claras. ",
    precio: 149.0,
    imagen: "producto2",
    actualizacion: "Ultima actualizacion 5 min atras",
  },
  {
    id: 3,
    nombre: "Cámara Retro X100",
    descripcion:
      "Sensor de alta resolución para fotos nítidas y vibrantes. Diseño vintage con acabados premium y controles manuales. Lente de alta calidad para capturar cada detalle con precisión. Grabación en Full HD para videos con un look cinematográfico. Conectividad WiFi y Bluetooth para compartir al instante. ",
    precio: 299.0,
    imagen: "producto3",
    actualizacion: "Ultima actualizacion 10 min atras",
  },
  {
    id: 4,
    nombre: "Smartphone Ultra",
    descripcion:
      "Pantalla AMOLED Full HD+ para una experiencia visual inmersiva. Procesador de alto rendimiento para máxima velocidad y fluidez. Cámara de ultra resolución para fotos y videos impresionantes. Batería de larga duración con carga rápida. Desbloqueo facial y sensor de huellas para mayor seguridad. Conectividad 5G para navegar sin límites.",
    precio: 599.0,
    imagen: "producto4",
    actualizacion: "Ultima actualizacion 7 min atras",
  },
];

// Array para almacenar las elecciones del usuario
let carrito = [];

// Función para renderizar los productos en el div con id "productos"
function renderizarProductos() {
  const contenedorProductos = document.getElementById("productos");
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card mb-3";
    card.innerHTML = `
      <div class="card">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="img/productos/${producto.imagen}.jpg"
              class="card-img-top"
              alt="${producto.nombre}"
            />                  
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <div class="card-body">                      
                <h5 class="card-title">${producto.nombre}</h5>                      
                <p class="card-text">${producto.descripcion}</p>
                <p class="card-text">
                  Precio: <strong>$${producto.precio}</strong>
                  <small class="text-body-secondary"
                    >${producto.actualizacion}</small
                  >
                </p>
                <button
                  class="btn btn-primary ch-btn-primary"
                  style="float: right; bottom: 4px; position: relative"
                  onclick="agregarAlCarrito(${producto.id})"
                >
                  Agregar al carrito
                </button>                      
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    contenedorProductos.appendChild(card);
  });
}

// Función para agregar un producto al carrito y actualizar la tabla
function agregarAlCarrito(productoId) {
  const producto = productos.find((p) => p.id === productoId);
  if (producto) {
    let itemCarrito = carrito.find((item) => item.producto === producto.nombre);
    if (itemCarrito) {
      itemCarrito.cantidad += 1;
    } else {
      carrito.push({
        producto: producto.nombre,
        cantidad: 1,
        precio: producto.precio,
      });
    }
    actualizarTablaCarrito();
  }
}

// Función para quitar un producto del carrito
function quitarDelCarrito(productoId) {
  const producto = productos.find((p) => p.id === productoId);
  if (producto) {
    let itemCarrito = carrito.find((item) => item.producto === producto.nombre);
    if (itemCarrito) {
      itemCarrito.cantidad -= 1;
      if (itemCarrito.cantidad <= 0) {
        carrito = carrito.filter((item) => item.producto !== producto.nombre);
      }
    }
    actualizarTablaCarrito();
  }
}

// Función para eliminar un producto completamente del carrito
function eliminarDelCarrito(productoId) {
  const producto = productos.find((p) => p.id === productoId);
  if (producto) {
    carrito = carrito.filter((item) => item.producto !== producto.nombre);
    actualizarTablaCarrito();
  }
}

// Función para actualizar la tabla del carrito
function actualizarTablaCarrito() {
  const tablaCarrito = document.querySelector("#carrito tbody");
  tablaCarrito.innerHTML = ""; // Limpiar la tabla

  let totalPagar = 0;

  carrito.forEach((item) => {
    const producto = productos.find((p) => p.nombre === item.producto);
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.producto}</td>
      <td>
        <div class="d-flex align-items-center">
          <button class="btn btn-sm btn-danger me-2" style="width: 30px;" onclick="quitarDelCarrito(${
            producto.id
          })">-</button>
          <span>${item.cantidad}</span>
          <button class="btn btn-sm btn-success ms-2" style="width: 30px;" onclick="agregarAlCarrito(${
            producto.id
          })">+</button>
        </div>
      </td>
      <td>$${item.precio.toFixed(2)}</td>
      <td>$${(item.cantidad * item.precio).toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="eliminarDelCarrito(${
          producto.id
        })">Eliminar</button>
      </td>
    `;
    tablaCarrito.appendChild(fila);

    totalPagar += item.cantidad * item.precio;
  });

  // Agregar fila del total
  const filaTotal = document.createElement("tr");
  filaTotal.innerHTML = `
    <td colspan="3"><strong>Total a Pagar</strong></td>
    <td><strong>$${totalPagar.toFixed(2)}</strong></td>
    <td></td>
  `;
  tablaCarrito.appendChild(filaTotal);
}

// Función para finalizar la compra, mostrar el total y borrar la tabla del carrito
function finalizarCompra() {
  if (carrito.length > 0) {
    const total = carrito.reduce(
      (acc, item) => acc + item.cantidad * item.precio,
      0
    );
    Swal.fire({
      title: "Compra Finalizada",
      text: `El total a pagar es: $${total.toFixed(2)}`,
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      carrito = []; // Vaciar el carrito
      actualizarTablaCarrito(); // Limpiar la tabla del carrito
    });
  } else {
    Swal.fire({
      title: "Carrito Vacío",
      text: "No hay productos en el carrito para finalizar la compra.",
      icon: "info",
      confirmButtonText: "Aceptar",
    });
  }
}

// Función para pedir el nombre del cliente y guardarlo en localStorage
function solicitarNombreCliente() {
  const nombreGuardado = localStorage.getItem("nombreCliente");
  if (!nombreGuardado) {
    Swal.fire({
      title: "Bienvenido",
      text: "Por favor, ingresa tu nombre:",
      input: "text",
      inputPlaceholder: "Tu nombre",
      showCancelButton: false,
      confirmButtonText: "Guardar",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        localStorage.setItem("nombreCliente", result.value);
        mostrarNombreCliente(result.value);
      }
    });
  } else {
    mostrarNombreCliente(nombreGuardado);
  }
}

// Función para mostrar el nombre del cliente en el header
function mostrarNombreCliente(nombre) {
  const header = document.querySelector("header .container-fluid");
  const saludo = document.createElement("div");
  saludo.className = "text-end text-white";
  saludo.innerHTML = `<strong>Hola, ${nombre}!</strong>`;
  header.appendChild(saludo);
}

// Renderizar los productos al cargar la página
$(document).ready(function () {
  solicitarNombreCliente();
  renderizarProductos();
  $("#finalizar_compra").on("click", finalizarCompra);
});
