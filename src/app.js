import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import indexRoutes from "./routes/index.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import bandasRoutes from "./routes/bandas.routes.js";
import contactosRoutes from "./routes/contactos.routes.js";

// Iniciamos express
const app = express();
const PORT = 4000;

// Configuración de rutas de archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Establecer el motor de plantilla EJS con la ruta de vistas especifica
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Establecer la ruta de archivos estaticos/publicos
app.use(express.static(path.join(__dirname, "public")));

// Middleware para análisis de cuerpo de solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use(indexRoutes);
app.use(productosRoutes);
app.use(bandasRoutes);
app.use(contactosRoutes);

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en: http://localhost:${PORT}/`);
});
