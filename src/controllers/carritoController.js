import db from "../config/database.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mostrarCarrito = async (req, res) => {
  try {
    const { carrito } = req.body;
    const productos = carrito["productos"];
    const cantidadTotal = carrito["cantidadTotal"];
    const total = carrito["total"];
    const query = "SELECT * FROM productos";

    const [row] = await db.query(query);

    ejs.renderFile(
      path.join(__dirname, "..", "views", "layouts", "carrito.ejs"),
      {
        productos,
        cantidadTotal,
        total,
        p_query: row,
      },
      (err, str) => {
        if (err) {
          return res.status(500).send("Error al renderizar el EJS");
        }
        res.send(str);
      }
    );
  } catch (error) {}
};

export { mostrarCarrito };
