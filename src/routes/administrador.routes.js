import express from "express";
import { mostrarAdministracion } from "../controllers/administrador.js";

const router = express.Router();

router.get("/administrador", mostrarAdministracion);

export default router;
