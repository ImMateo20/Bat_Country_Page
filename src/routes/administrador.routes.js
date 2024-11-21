import express from "express";
import {
  mostrarAdministracion,
  mostrarProductos,
  eliminarProducto,
  mostrarVentas,
  obtenerProductosMasVendidos,
  obtenerVentasUltimoDia,
  obtenerVentasUltimaSemana,
} from "../controllers/administradorController.js";

const router = express.Router();

router.get("/administrador", mostrarAdministracion);
router.get("/administrador/productos", mostrarProductos);
router.get("/administrador/productos/:id", eliminarProducto);
router.get("/administrador/ventas", mostrarVentas);
router.get(
  "/administrador/productos-mas-vendidos",
  obtenerProductosMasVendidos
);
router.get("/administrador/ventas-ultimo-dia", obtenerVentasUltimoDia);
router.get("/administrador/ventas-ultima-semana", obtenerVentasUltimaSemana);

export default router;
