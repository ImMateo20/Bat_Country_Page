// document.getElementById("botonEnviarBanda").addEventListener("click", () => {
//   const nombreBanda = document.getElementById("nombre-banda");
//   const descripcionBanda = document.getElementById("descripcion-banda");
//   const fotoBanda = document.getElementById("foto-banda");
//   const formData = new FormData;
//   formData.append("nombre", nombreBanda.value);
//   formData.append("descripcion", descripcionBanda.value);
// //   formData.append("foto", fotoBanda.files[0]);

//   fetch("/bandas/insertar", {
//     method: "POST",
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(formData),
//   }).catch((error) => {
//     console.error("Error al hacer la peticion:", error);
//   });
// });

function procesar() {
  console.log("Hola mundo");

  fetch("/ventas/insertar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      carrito,
    }),
  });
}

function verCarrito() {
  fetch("/carrito", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      carrito,
    }),
  })
    .then((response) => response.text())
    .then((html) => {
      const contenedorCarrito = document.getElementById("main-principal");

      contenedorCarrito.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error al obtener el carrito: ", error);
    });
}

function realizarCompra() {
  fetch("/ventas/insertar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      carrito,
    }),
  }).catch((error) => {
    console.error("Error al hacer la compra: ", error);
  });
  reiniciarCarrito();
  const contenedorCarrito = document.getElementById("carro-productos");

  contenedorCarrito.innerHTML = "<h2>Compra realiza con exito!</h2>";
}

function guardarCarritoSession(carrito) {
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoSession() {
  const carritoGuardado = sessionStorage.getItem("carrito");
  if (carritoGuardado) {
    const car = JSON.parse(carritoGuardado);
    if (contadorCarrito) {
      contadorCarrito.textContent = car["cantidadTotal"] || 0;
    }
    return car;
  }

  return {
    productos: [],
    cantidadTotal: 0,
    total: 0,
  };
}

const contadorCarrito = document.getElementById("elementos-carrito");
let carrito = cargarCarritoSession();

function agregarAlCarrito(id, nombre, precio) {
  contadorCarrito.textContent =
    parseInt(contadorCarrito.textContent) > 99
      ? "99+"
      : parseInt(contadorCarrito.textContent) + 1;

  if (carrito["productos"].find((producto) => producto.id === id)) {
    let producto = carrito["productos"].find((producto) => producto.id === id);
    producto.cantidad += 1;
  } else {
    carrito["productos"].push({
      id: id,
      nombre: nombre,
      cantidad: 1,
      precio: parseFloat(precio),
    });
  }

  carrito["cantidadTotal"] = parseInt(contadorCarrito.textContent) + 1;
  carrito["cantidadTotal"] = parseInt(contadorCarrito.textContent);
  carrito["total"] = carrito["total"] + parseFloat(precio);

  console.table(carrito);
  guardarCarritoSession(carrito);
}

function eliminarDelCarrito(id) {
  // Buscar el producto en el carrito
  const producto = carrito["productos"].find((producto) => producto.id === id);

  // Si el producto existe en el carrito
  if (producto) {
    // Resta la cantidad total y el precio total del producto
    carrito["cantidadTotal"] -= producto.cantidad;
    carrito["total"] -= producto.cantidad * producto.precio;

    // Eliminar el producto del carrito
    carrito["productos"] = carrito["productos"].filter(
      (producto) => producto.id !== id
    );

    // Actualizamos el contador
    if (contadorCarrito) {
      contadorCarrito.textContent = carrito["cantidadTotal"];
    }

    // Guardar los cambios en el sessionStorage
    guardarCarritoSession(carrito);

    // Mostrar el carrito actualizado
    verCarrito();
  } else {
    console.log("Producto no encontrado en el carrito");
  }
}

function reiniciarCarrito() {
  carrito = {
    productos: [],
    cantidadTotal: 0,
    total: 0,
  };

  if (contadorCarrito) {
    contadorCarrito.textContent = carrito["cantidadTotal"];
  }

  guardarCarritoSession(carrito);

  console.log("El carrito ha sido reiniciado");
}
