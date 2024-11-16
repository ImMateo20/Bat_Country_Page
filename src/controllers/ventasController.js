import db from "../config/database.js";

const insertarVenta = async (req, res) => {
  try {
    const { carrito } = req.body;
    const productos = carrito["productos"];
    const total = carrito["total"];

    const ventaQuery = "INSERT INTO ventas (fecha, total) VALUES (NOW(), ?)";
    const [ventaResult] = await db.query(ventaQuery, [total]);
    const ventaId = ventaResult.insertId;

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

export { insertarVenta };
