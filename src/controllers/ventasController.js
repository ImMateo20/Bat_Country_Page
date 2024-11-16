import db from "../config/database.js";

const mostrarVentas = (req, res) => {
  res.render("layouts/ventas.ejs");
};

const insertarVenta = async (req, res) => {
  try {
    const { carrito } = req.body;
    const productos = carrito["productos"];
    const total = carrito["total"];

    // Insertar venta
    const ventaQuery = "INSERT INTO ventas (fecha, total) VALUES (NOW(), ?)";
    const [ventaResult] = await db.query(ventaQuery, [total]);
    const ventaId = ventaResult.insertId; // ID de la venta recién creada

    // Insertar productos relacionados con la venta
    const productoQuery =
      "INSERT INTO productos_ventas (venta_id, producto_id, cantidad) VALUES (?, ?, ?)";
    for (const producto of productos) {
      await db.query(productoQuery, [ventaId, producto.id, producto.cantidad]);
    }

    res.redirect("/productos");
  } catch (error) {
    console.error("Error al registrar la venta", error);
    res.status(500).send("Error al registrar la venta");
  }
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
      LIMIT 3;
    `;

    const [result] = await db.query(query);

    res.status(200).json(result); // Enviar datos como JSON
  } catch (error) {
    console.error("Error al obtener productos más vendidos", error);
    res.status(500).send("Error al obtener productos más vendidos");
  }
};

const obtenerVentasUltimas5Horas = async (req, res) => {
  try {
    // Consulta para obtener las ventas de las últimas 5 horas
    const query = `
      SELECT 
        HOUR(fecha) AS hora,
        SUM(total) AS total_ventas
      FROM 
        ventas
      WHERE 
        fecha >= NOW() - INTERVAL 5 HOUR
      GROUP BY 
        HOUR(fecha)
      ORDER BY 
        hora DESC;
    `;
    
    const [result] = await db.query(query);

    // Responder con los datos en formato JSON
    res.json(result);
  } catch (error) {
    console.error("Error al obtener ventas", error);
    res.status(500).send("Error al obtener las ventas");
  }
};


export { mostrarVentas, insertarVenta, obtenerProductosMasVendidos, obtenerVentasUltimas5Horas};
