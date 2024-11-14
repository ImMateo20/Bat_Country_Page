import db from "../config/database.js";

const mostrarBandas = async (req, res) => {
  try {
    const query = "SELECT * FROM bandas";
    const [rows] = await db.query(query);
    res.render("layouts/bandas", { bandas: rows });
  } catch (error) {
    console.error(`Error en la consulta: `, error);
    res.status(500).send("Error en la consulta");
  }
};

const insertarBanda = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const foto = req.file;
    console.log(nombre);

    if (!foto) {
      return res.status(400).send("No se ha cargado ninguna imagen");
    }

    const query =
      "INSERT INTO bandas (nombre, descripcion, foto) VALUES (?,?,?)";

    await db.query(query, [nombre, descripcion, foto.buffer]);

    res.redirect("/bandas");
  } catch (error) {
    console.error("Error al insertar los datos", error);
    return res.status(500).send("Error en la base de datos");
  }
};

export { mostrarBandas, insertarBanda };
