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
