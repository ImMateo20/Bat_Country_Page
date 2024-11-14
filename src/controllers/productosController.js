import db from "../config/database.js";

const mostrarProductos = async (req, res) => {
  try {
    const queryProductos = "SELECT * FROM productos";
    const [rows] = await db.query(queryProductos);
    const queryBanda = "SELECT * FROM bandas";
    const [row] = await db.query(queryBanda);
    res.render("layouts/productos", { productos: rows, bandas: row });
  } catch (error) {
    console.error(`Error en la consulta: `, error);
    res.status(500).send("Error en la consulta");
  }
};

const mostrarProductosXBanda = async (req, res) => {
  try {
    const id = req.params.id;
    const queryProductos = `SELECT * FROM productos WHERE banda_id=${id}`;
    const [rows] = await db.query(queryProductos);
    const queryBanda = "SELECT * FROM bandas";
    const [row] = await db.query(queryBanda);
    res.render("layouts/productos", { productos: rows, bandas: row });
  } catch (error) {
    console.error(`Error en la consulta: `, error);
    res.status(500).send("Error en la consulta");
  }
};

const insertarProducto = async (req, res) => {
  try {
    const { nombre, descripcion, cantidad, precio, banda_id } = req.body;
    const imagen = req.file;

    if (!imagen) {
      return res.status(400).send("No se ha cargado ninguna imagen");
    }

    const query =
      "INSERT INTO productos (nombre, descripcion, precio, imagen, banda_id, cantidad) VALUES (?,?,?,?,?,?)";

    await db.query(query, [
      nombre,
      descripcion,
      precio,
      imagen.buffer,
      banda_id,
      cantidad,
    ]);

    res.redirect("/productos");
  } catch (error) {
    console.error("Error al insertar los datos", error);
    return res.status(500).send("Error en la base de datos");
  }
};

export { mostrarProductos, mostrarProductosXBanda, insertarProducto };
