import express from "express";
import {
  mostrarContactos,
  insertarContacto,
} from "../controllers/contactosController.js";

const router = express.Router();

router.get("/contactos", mostrarContactos);
router.post("/contactos/insertar", insertarContacto);

export default router;
