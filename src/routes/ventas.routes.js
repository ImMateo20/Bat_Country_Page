import express from "express";
import {
  insertarVenta,
} from "../controllers/ventasController.js";

const router = express.Router();

router.post("/ventas/insertar", insertarVenta);

export default router;
