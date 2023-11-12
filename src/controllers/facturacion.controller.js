import db from "../conexdb.js";
const pool = db;

export const createFacturacion = async (req, res, next) => {
    const { ID_FACTURA, ID_ORDEN, FECHA_HORA, TOTAL, MONTO_PAGADO, VUELTO, ID_USUARIO } = req.body;
    if (!ID_FACTURA || !ID_ORDEN || !FECHA_HORA || !TOTAL || !MONTO_PAGADO || !VUELTO || !ID_USUARIO) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    const newFacturacion = {
      ID_FACTURA,
      ID_ORDEN,
      FECHA_HORA,
      TOTAL,
      MONTO_PAGADO,
      VUELTO,
      ID_USUARIO,
    };
    try {
      const result = await pool.query("INSERT INTO TBL_FACTURAS SET ?", [newFacturacion]);
      const nuevoToken = req.nuevoToken;
      res.json({ message: "Creaste Facturacion",newFacturacion,nuevoToken});
    } catch (error) {
      console.error("Error al crear la FACTURA:", error);
      res.status(500).json({ message: "Error al crear Facturacion" });
    }
  };

  export const getFacturacion = async (req, res, next) => {
    try {
      const listarFacturacion = await pool.query("SELECT * FROM TBL_FACTURAS");
      const nuevoToken = req.nuevoToken;
      res.json({ listarFacturacion, nuevoToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };

  export const getFacturacionid = async (req, res, next) => {
    const { ID_FACTURA } = req.params;
    if (!ID_FACTURA) {
      return res.status(400).json({ message: "ID_FACTURA es requerido" });
    }
    try {
      const listarFacturacion = await pool.query(`SELECT * FROM TBL_FACTURAS WHERE ID_FACTURA = ? `, [ID_FACTURA]);
      if (listarFacturacion.length === 0) {
        return res.status(404).json({ message: "Facturacion no encontrada" });
      }
      const nuevoToken = req.nuevoToken;
      res.json({ message: "Consulta Facturacion exitosa", listarFacturacion, nuevoToken, ID_FACTURA: ID_FACTURA });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };

export const getFacturacionByid = async (req, res, next) => {
  const { ID_FACTURA } = req.params;

  if (!ID_FACTURA) {
    return res.status(400).json({ message: "ID_FACTURA parameter missing" });
  }

  try {
    const listarFacturacionDetalle = await pool.query(
      `SELECT
        TBL_PRODUCTOS.NOMBRE_PRODUCTO,
        TBL_DETALLE_ORDEN.CANTIDAD,
        (TBL_PRODUCTOS.VENTA_PRODUCTO * TBL_DETALLE_ORDEN.CANTIDAD) AS PRECIO_UNITARIO,
        (TBL_PRODUCTOS.VENTA_PRODUCTO * TBL_DETALLE_ORDEN.CANTIDAD) AS TOTAL
      FROM
        TBL_FACTURAS
        INNER JOIN TBL_ORDEN ON TBL_FACTURAS.ID_ORDEN = TBL_ORDEN.ID_ORDEN
        INNER JOIN TBL_DETALLE_ORDEN ON TBL_ORDEN.ID_ORDEN = TBL_DETALLE_ORDEN.ID_ORDEN
        INNER JOIN TBL_PRODUCTOS ON TBL_DETALLE_ORDEN.ID_PRODUCTO = TBL_PRODUCTOS.ID_PRODUCTO
      WHERE
        TBL_FACTURAS.ID_FACTURA = ? `,
      [ID_FACTURA]
    );

    if (!listarFacturacionDetalle) {
      return res.status(404).json({ message: "Facturacion not found" });
    }

    const nuevoToken = req.nuevoToken;
    console.log(ID_FACTURA);
    res.json({
      message: "Consulta de facturacion exitosa",
      listarFacturacionDetalle,
      nuevoToken,
      ID_FACTURA: ID_FACTURA,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateFacturacionByid = async (req, res, next) => {
    const { ID_FACTURA } = req.params;
  
    if (!ID_FACTURA) {
      return res.status(400).json({ message: "Falta el parámetro ID_FACTURA" });
    }
  
    const { ID_ORDEN, FECHA_HORA, TOTAL, MONTO_PAGADO, VUELTO, ID_USUARIO } =
      req.body;
  
    if (!ID_ORDEN || !FECHA_HORA || !TOTAL || !MONTO_PAGADO || !VUELTO || !ID_USUARIO) {
      return res.status(400).json({ message: "Falta uno o más parámetros" });
    }
  
    const editFacturacion = {
      ID_ORDEN,
      FECHA_HORA,
      TOTAL,
      MONTO_PAGADO,
      VUELTO,
      ID_USUARIO,
    };
  
    try {
      await pool.query("UPDATE TBL_FACTURAS SET ? WHERE ID_FACTURA=?", [
        editFacturacion,
        ID_FACTURA,
      ]);
      res.json({ message: "Facturacion actualizada con exito" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };