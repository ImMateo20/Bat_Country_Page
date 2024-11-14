import db from "../config/database.js";

const mostrarContactos = async (req, res) => {
  try {
    const query = "SELECT * FROM contactos";
    const [rows] = await db.query(query);

    const queryBanda = "SELECT * FROM bandas";
    const [row] = await db.query(queryBanda);
    res.render("layouts/contactos", { contactos: rows, bandas: row });
  } catch (error) {
    console.error(`Error en la consulta: `, error);
    res.status(500).send("Error en la consulta");
  }
};

const insertarContacto = async (req, res) => {
  try {
    const { contacto, tipo, banda_id } = req.body;

    const query =
      "INSERT INTO contactos (contacto, tipo, banda_id) VALUES (?,?,?)";

    await db.query(query, [contacto, tipo, banda_id]);

    res.redirect("/contactos");
  } catch (error) {
    console.error("Error al insertar los datos", error);
    return res.status(500).send("Error en la base de datos");
  }
};

export { mostrarContactos, insertarContacto };
