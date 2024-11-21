import db from "../config/database.js";

const mostrarAdministracion = async (req, res) => {
  try {
    const query = "SELECT id, nombre FROM bandas";
    const [rows] = await db.query(query);
    res.render("admin/administrador.ejs", { bandas: rows });
  } catch (error) {
    console.error(`Error en la consulta: `, error);
    res.status(500).send("Error en la consulta");
  }
};

const mostrarProductos = async (req, res) => {
  try {
    const query = "SELECT * FROM productos";
    const [rows] = await db.query(query);
    console.log(rows);
    res.render("admin/productos.ejs", { productos: rows });
  } catch (error) {
    console.error(`Error en la consulta: `, error);
    res.status(500).send("Error en la consulta");
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `DELETE FROM productos WHERE id=${id}`;
    const resultado = await db.query(query);
    res.redirect("/administrador/productos");
  } catch (error) {
    console.error(`Error en la consulta: `, error);
    res.status(500).send("Error en la consulta");
  }
};

const mostrarBandas = async (req, res) => {
  try {
    const query = "SELECT * FROM bandas";
    const [rows] = await db.query(query);
    console.log(rows);
    res.render("admin/bandas.ejs", { bandas: rows });
  } catch (error) {
    console.error(`Error en la consulta: `, error);
    res.status(500).send("Error en la consulta");
  }
};

const eliminarBanda = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `DELETE FROM bandas WHERE id=${id}`;
    const resultado = await db.query(query);
    res.redirect("/administrador/bandas");
  } catch (error) {
    console.error(`Error en la consulta: `, error);
    res.status(500).send("Error en la consulta");
  }
};

const mostrarVentas = (req, res) => {
  res.render("admin/ventas.ejs");
};

const obtenerProductosMasVendidos = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.nombre AS producto,
        SUM(pv.cantidad) AS total_vendido
      FROM 
        productos_ventas pv
      JOIN 
        productos p ON pv.producto_id = p.id
      GROUP BY 
        p.nombre
      ORDER BY 
        total_vendido DESC
      LIMIT 10;
    `;

    const [result] = await db.query(query);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener productos más vendidos", error);
    res.status(500).send("Error al obtener productos más vendidos");
  }
};

const obtenerVentasUltimoDia = async (req, res) => {
  try {
    const query = `
      SELECT 
        HOUR(fecha) AS hora,
        SUM(total) AS total_ventas
      FROM 
        ventas
      WHERE 
        fecha >= NOW() - INTERVAL 1 DAY
      GROUP BY 
        HOUR(fecha)
      ORDER BY 
        hora ASC;
    `;

    const [result] = await db.query(query);

    res.json(result);
  } catch (error) {
    console.error("Error al obtener ventas", error);
    res.status(500).send("Error al obtener las ventas");
  }
};

const obtenerVentasUltimaSemana = async (req, res) => {
  try {
    const query = `
      SELECT 
        DATE(fecha) AS dia,
        SUM(total) AS total_ventas
      FROM 
        ventas
      WHERE 
        fecha >= NOW() - INTERVAL 7 DAY
      GROUP BY 
        DATE(fecha)
      ORDER BY 
        dia DESC;
    `;

    const [result] = await db.query(query);

    res.json(result);
  } catch (error) {
    console.error("Error al obtener ventas", error);
    res.status(500).send("Error al obtener las ventas");
  }
};

export {
  mostrarVentas,
  mostrarProductos,
  eliminarProducto,
  mostrarBandas,
  eliminarBanda,
  obtenerProductosMasVendidos,
  obtenerVentasUltimoDia,
  obtenerVentasUltimaSemana,
  mostrarAdministracion,
};
