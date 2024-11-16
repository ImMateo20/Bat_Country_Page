import db from "../config/database.js";

const mostrarAdministracion = async (req, res) => {
  try {
    const query = "SELECT id, nombre FROM bandas";
    const [rows] = await db.query(query);
    res.render("layouts/administrador.ejs", { bandas: rows });
  } catch (error) {
    console.error(`Error en la consulta: `, error);
    res.status(500).send("Error en la consulta");
  }
};

export { mostrarAdministracion };
