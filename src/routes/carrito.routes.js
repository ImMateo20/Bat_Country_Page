import express from "express";
import { mostrarCarrito } from "../controllers/carritoController.js";

const router = express.Router();

router.post("/carrito", mostrarCarrito);

export default router;
