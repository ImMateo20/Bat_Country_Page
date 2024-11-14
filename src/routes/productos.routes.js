import express from "express";
import {
  mostrarProductos,
  mostrarProductosXBanda,
  insertarProducto,
} from "../controllers/productosController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

router.get("/productos", mostrarProductos);
router.get("/productos/:id", mostrarProductosXBanda);
router.post("/productos/insertar", upload.single("imagen"), insertarProducto);

export default router;
