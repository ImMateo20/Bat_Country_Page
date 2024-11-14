import express from "express";
import {
  mostrarBandas,
  insertarBanda,
} from "../controllers/bandasController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

router.get("/bandas", mostrarBandas);
router.post("/bandas/insertar", upload.single("foto"), insertarBanda);

export default router;
