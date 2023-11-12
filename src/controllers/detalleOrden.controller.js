import db from "../conexdb.js";
const pool = db;

export const createDetalleOrder = async (req, res) => {
  try {
    const detallesOrden = req.body;
    if (!Array.isArray(detallesOrden)) {
      return res.status(400).json({ message: "El cuerpo de la solicitud debe ser un arreglo" });
    }
    for (let detalle of detallesOrden) {
      const { ID_ORDEN, ID_PRODUCTO, OBSERVACION, CANTIDAD } = detalle;
      if (!ID_ORDEN || !ID_PRODUCTO || !CANTIDAD) {
        return res.status(400).json({ message: "ID_ORDEN, ID_PRODUCTO y CANTIDAD son campos requeridos" });
      }
      const newDetalleOrder = { ID_ORDEN, ID_PRODUCTO, OBSERVACION, CANTIDAD };
      await pool.query("INSERT INTO TBL_DETALLE_ORDEN SET ?", [
        newDetalleOrder,
      ]);
    }
    const nuevoToken = req.nuevoToken;
    res.json("Detalles de orden creados exitosamente",{newDetalleOrder,nuevoToken});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear detalles de orden" });
  }
};

export const getDetalleOrder = async (req, res) => {
  try {
    const listarDetalleOrder = await pool.query(
      "SELECT * FROM TBL_DETALLE_ORDEN"
    );
    const nuevoToken = req.nuevoToken;
    res.json({ listarDetalleOrder, nuevoToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export const getDetalleOrderByid = async (req, res) => {
  const { ID_DETALLE_ORDEN } = req.params;
  try {
    if (!ID_DETALLE_ORDEN) {
      return res.status(400).json({ message: "ID_DETALLE_ORDEN es un campo requerido" });
    }
    const listarDetalleOrdenId = await pool.query(
      "SELECT * FROM TBL_DETALLE_ORDEN WHERE ID_DETALLE_ORDEN=?",
      [ID_DETALLE_ORDEN]
    );
    const nuevoToken = req.nuevoToken;
    res.json({listarDetalleOrdenId,nuevoToken});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getDetalleOrderOrden = async (req, res) => {
  const { ID_ORDEN } = req.params;
  try {
    if (!ID_ORDEN) {
      return res.status(400).json({ message: "ID_ORDEN is required" });
    }
    const DetalleOrden = await pool.query(
      `SELECT TBL_DETALLE_ORDEN.ID_ORDEN, TBL_PRODUCTOS.ID_PRODUCTO, TBL_PRODUCTOS.NOMBRE_PRODUCTO, TBL_PRODUCTOS.IMAGEN_URL, 
      SUM(TBL_DETALLE_ORDEN.CANTIDAD) AS CANTIDAD, TBL_PRODUCTOS.VENTA_PRODUCTO AS PRECIO, 
      SUM(TBL_DETALLE_ORDEN.CANTIDAD * TBL_PRODUCTOS.VENTA_PRODUCTO) AS TOTAL
  FROM TBL_DETALLE_ORDEN 
  JOIN TBL_PRODUCTOS ON TBL_DETALLE_ORDEN.ID_PRODUCTO = TBL_PRODUCTOS.ID_PRODUCTO 
  WHERE TBL_DETALLE_ORDEN.ID_ORDEN = ?
  GROUP BY TBL_DETALLE_ORDEN.ID_ORDEN, TBL_PRODUCTOS.ID_PRODUCTO, TBL_PRODUCTOS.NOMBRE_PRODUCTO, TBL_PRODUCTOS.IMAGEN_URL, TBL_PRODUCTOS.VENTA_PRODUCTO;
  `,
      [ID_ORDEN]
    );

    const nuevoToken = req.nuevoToken;
    res.json({ DetalleOrden, nuevoToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export const updateDetalleOrderByid = async (req, res) => {
  const { ID_DETALLE_ORDEN } = req.params;
  const { ID_PRODUCTO, OBSERVACION, CANTIDAD, PAGADO } = req.body;
  const editDetalleOrder = {
    ID_PRODUCTO,
    OBSERVACION,
    CANTIDAD,
    PAGADO,
  };

  try {
    if (!ID_DETALLE_ORDEN) {
      return res.status(400).json({ message: "ID_DETALLE_ORDEN is required" });
    }
    if (!ID_PRODUCTO) {
      return res.status(400).json({ message: "ID_PRODUCTO is required" });
    }
    if (!CANTIDAD) {
      return res.status(400).json({ message: "CANTIDAD is required" });
    }
    await pool.query(
      "UPDATE TBL_DETALLE_ORDEN SET ? WHERE ID_DETALLE_ORDEN=?",
      [editDetalleOrder, ID_DETALLE_ORDEN]
    );
    const nuevoToken = req.nuevoToken;
    res.json("updated DetalleOrder",{editDetalleOrder,nuevoToken});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};
