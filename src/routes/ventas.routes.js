import express from "express";
import {
  insertarVenta,
  mostrarVentas,
  obtenerProductosMasVendidos,
  obtenerVentasUltimas5Horas,
} from "../controllers/ventasController.js";

const router = express.Router();

router.get("/ventas", mostrarVentas);
router.post("/ventas/insertar", insertarVenta);
router.get("/ventas/productos-mas-vendidos", obtenerProductosMasVendidos);
router.get("/ventas/ventas-ultimas-horas", obtenerVentasUltimas5Horas);

export default router;
