// Función para obtener productos desde la API
let productosAPI = [];

function obtenerProductos() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      const data = await response.json();
      productosAPI = data.map((producto) => ({
        id: producto.id,
        nombre: producto.title,
        descripcion: producto.description,
        precio: producto.price,
        imagen: producto.image,
        actualizacion: "Actualizado recientemente",
      }));
      Toastify({
        text: "Productos cargados Exitosamente",
        duration: 2000,
        gravity: "bottom",
      }).showToast();

      resolve(productosAPI);
    } catch (error) {
      reject(
        new Error(
          "No se pudo conectar a la API. Por favor, intente nuevamente más tarde."
        )
      );
    }
  });
}

// Array para almacenar las elecciones del usuario
let carrito = [];

// Modificar la función para renderizar productos desde la API
function renderizarProductos() {
  obtenerProductos()
    .then((productosAPI) => {
      const contenedorProductos = document.getElementById("productos");
      productosAPI.forEach((producto) => {
        const card = document.createElement("div");
        card.className = "card mb-3";
        card.innerHTML = `
          <div class="card">
            <div class="row g-0">
              <div class="col-md-4 d-flex align-items-center justify-content-center">
                <img
                  src="${producto.imagen}"
                  class="card-img-top img-fluid"
                  alt="${producto.nombre}"
                  style="max-height: 150px; object-fit: contain;"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text">
                      Precio: <strong>$${producto.precio}</strong>
                    </p>
                    <p class="card-text">
                      <small class="text-body-secondary">${producto.actualizacion}</small>
                    </p>
                    <button
                      class="btn btn-primary ch-btn-primary"
                      style="float: right; bottom: 4px; position: relative"
                      onclick="agregarAlCarrito(${producto.id})"
                    >
                      <i class="fa-solid fa-cart-plus"></i> Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        contenedorProductos.appendChild(card);
      });
    })
    .catch((error) => {
      Swal.fire({
        title: "Carga de Carrito",
        text: error,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    });
}

// Función para agregar un producto al carrito y actualizar la tabla
function agregarAlCarrito(productoId) {
  const producto = productosAPI.find((p) => p.id === productoId);
  if (producto) {
    let itemCarrito = carrito.find((item) => item.producto === producto.nombre);
    if (itemCarrito) {
      itemCarrito.cantidad += 1;
      Toastify({
        text: "Se sumo un articulo mas al producto: " + producto.nombre,
        duration: 3000,
        gravity: "bottom",
      }).showToast();
    } else {
      carrito.push({
        producto: producto.nombre,
        cantidad: 1,
        precio: producto.precio,
      });
      Toastify({
        text: producto.nombre + " agregado correctamente al carrito",
        duration: 3000,
        gravity: "bottom",
      }).showToast();
    }
    actualizarTablaCarrito();
  }
}

// Función para quitar un producto del carrito
function quitarDelCarrito(productoId) {
  const producto = productosAPI.find((p) => p.id === productoId);
  if (producto) {
    let itemCarrito = carrito.find((item) => item.producto === producto.nombre);
    if (itemCarrito) {
      itemCarrito.cantidad -= 1;
      Toastify({
        text: "Se quito un articulo mas al producto: " + producto.nombre,
        duration: 3000,
        gravity: "bottom",
      }).showToast();
      if (itemCarrito.cantidad <= 0) {
        carrito = carrito.filter((item) => item.producto !== producto.nombre);
      }
    }
    actualizarTablaCarrito();
  }
}

// Función para eliminar un producto completamente del carrito
function eliminarDelCarrito(productoId) {
  const producto = productosAPI.find((p) => p.id === productoId);
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
    const producto = productosAPI.find((p) => p.nombre === item.producto);
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
        })"><i class="fa-solid fa-trash"></i></button>
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
  const nombreGuardado = localStorage.getItem("nombreClienteFinal");
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
        localStorage.setItem("nombreClienteFinal", result.value);
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
  const contenedor = document.createElement("div");
  contenedor.className = "text-end text-white";

  const saludo = document.createElement("div");
  saludo.innerHTML = `<strong>Hola, ${nombre}!</strong>`;

  const fechaHora = document.createElement("div");
  setInterval(() => {
    const now = luxon.DateTime.now().toLocaleString(
      luxon.DateTime.DATETIME_MED
    );
    fechaHora.innerHTML = `<small>${now}</small>`;
  }, 1000);

  contenedor.appendChild(saludo);
  contenedor.appendChild(fechaHora);
  header.appendChild(contenedor);
}

// Renderizar los productos al cargar la página
$(document).ready(function () {
  solicitarNombreCliente();
  renderizarProductos();
  $("#finalizar_compra").on("click", finalizarCompra);
});
