import db from "../conexdb.js";
const pool = db;

export const createOrden = async (req, res) => {
  const { ID_ORDEN, ID_MESA, ID_USUARIO,FECHA_HORA_PEDIDO	,
    TIEMPO_ESPERA,
    HORA_ACEPTADO, ID_TIPO_ORDEN, TOTAL } = req.body;
  if (!ID_TIPO_ORDEN) {
    return res.status(400).json({ message: "ID_TIPO_ORDEN es requerido" });
  }
  const newOrden = {
    ID_ORDEN,
    ID_USUARIO,
    FECHA_HORA_PEDIDO	,
    TIEMPO_ESPERA,
    HORA_ACEPTADO,
    ID_MESA,
    ID_TIPO_ORDEN,
    TOTAL,
  };
  try {
    await pool.query("INSERT INTO TBL_ORDEN SET ?", [newOrden]);
    res.json({ message: "Orden creada", ID_ORDEN, ID_MESA });
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({ message: "Error al crear la orden" });
  }
};


export const getOrden = async (req, res) => {
  try {
    const listarOrden = await pool.query(`SELECT o.*, u.USUARIO, e.NOMBRE_COMPLETO
    FROM TBL_ORDEN o
    INNER JOIN TBL_USUARIOS u ON o.ID_USUARIO = u.ID_USUARIO
    INNER JOIN TBL_EMPLEADO e ON u.ID_EMPLEADO = e.ID_EMPLEADO;
    `);
    const nuevoToken = req.nuevoToken;
    res.json({ listarOrden, nuevoToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const getOrdenByid = async (req, res) => {
  const { ID_ORDEN } = req.params;
  try {
    const [listarOrdenID] = await pool.query(
      "SELECT * FROM TBL_ORDEN WHERE ID_ORDEN=?",
      [ID_ORDEN]
    );
    if (!listarOrdenID) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    const nuevoToken = req.nuevoToken;
    res.json({ listarOrdenID, nuevoToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const updateOrdenByid = async (req, res) => {
  const { ID_ORDEN } = req.params;
  const { ID_MESA,ID_USUARIO,FECHA_HORA_PEDIDO,ESTADO_PEDIDO,ESTADO_PAGO,TIEMPO_ESPERA,HORA_ACEPTADO,ID_TIPO_ORDEN,TOTAL } = req.body;
  const editOrden = {
    ESTADO_PEDIDO,HORA_ACEPTADO
  };
  try {
    console.log(editOrden);
    await pool.query("UPDATE TBL_ORDEN SET ? WHERE ID_ORDEN=?", [
      editOrden, ID_ORDEN]);
    const nuevoToken = req.nuevoToken;
    res.json({ message: "Orden actualizada", nuevoToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
