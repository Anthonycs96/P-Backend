import db from "../conexdb.js";
const pool = db;

export const createMesa = async (req, res) => {
  const { ID_MESA, NOMBRE_MESA, IMAGEN_URL, CAPACIDAD } = req.body;
  if (!ID_MESA || !NOMBRE_MESA || !IMAGEN_URL || !CAPACIDAD) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newMesas = {
    ID_MESA,
    NOMBRE_MESA,
    IMAGEN_URL,
    CAPACIDAD,
  };
  try {
    await pool.query("INSERT INTO TBL_MESA SET ?", [newMesas]);
    const nuevoToken = req.nuevoToken;
    res.json({ message: "Mesa created successfully",newMesas,nuevoToken});
  } catch (error) {
    console.error("Error creating mesa:", error);
    res.status(500).json({ error: "Error creating mesa" });
  }
};

export const getMesa = async (req, res) => {
  try {
    const listarMesas = await pool.query(`SELECT m.ID_MESA, m.NOMBRE_MESA, m.ESTADO, m.CAPACIDAD, m.IMAGEN_URL, o.ID_ORDEN, o.ESTADO_PEDIDO
    FROM TBL_MESA m
    LEFT JOIN TBL_ORDEN o ON m.ID_MESA = o.ID_MESA
    ORDER BY m.ID_MESA ASC;`);
    const nuevoToken = req.nuevoToken;
    res.json({ listarMesas, nuevoToken });
  } catch (error) {
    console.error("Error getting mesas:", error);
    res.status(500).json({ error: "Error getting mesas" });
  }
};

export const getMesaByid = async (req, res) => {
  const { ID_MESA } = req.params;
  if (!ID_MESA) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const listarProductosID = await pool.query(
      "SELECT * FROM TBL_MESA WHERE ID_MESA = ?",
      [ID_MESA]
    );
    const nuevoToken = req.nuevoToken;
    res.json({listarProductosID,nuevoToken});
  } catch (error) {
    console.error("Error getting mesa by ID:", error);
    res.status(500).json({ error: "Error getting mesa by ID" });
  }
};

export const getMesaByEstado = async (req, res) => {
  const { ESTADO } = req.params;
  if (!ESTADO) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const listarMesas = await pool.query(
      "SELECT * FROM TBL_MESA WHERE ESTADO = ?",
      [ESTADO]
    );
    const nuevoToken = req.nuevoToken;
    res.json({ listarMesas, nuevoToken });
  } catch (error) {
    console.error("Error getting mesas by estado:", error);
    res.status(500).json({ error: "Error getting mesas by estado" });
  }
};

export const getEspecialMesa = async (req, res) => {
  const { ESTADO } = req.params;
  try {
    if (!ESTADO) {
      return res.status(400).json({ error: "Missing required parameter 'ESTADO'" });
    }
    const mesaDetalleOrden = await pool.query(`
      SELECT m.ID_MESA, m.NOMBRE_MESA, m.ESTADO, m.CAPACIDAD, m.IMAGEN_URL, o.ID_ORDEN, o.ESTADO_PEDIDO 
      FROM TBL_MESA m 
      LEFT JOIN TBL_ORDEN o ON m.ID_MESA = o.ID_MESA 
      WHERE m.ESTADO = ?
      ORDER BY m.ID_MESA ASC;
    `, [ESTADO]);
    const nuevoToken = req.nuevoToken;
    res.json({ mesaDetalleOrden, nuevoToken });
  } catch (error) {
    console.error("Error getting mesa:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateMesaByid = async (req, res) => {
  const { ID_MESA } = req.params;
  const { NOMBRE_MESA, IMAGEN_URL, CAPACIDAD, ESTADO } = req.body;
  try {
    if (!ID_MESA) {
      return res.status(400).json({ error: "Missing required parameter 'ID_MESA'" });
    }
    if (!NOMBRE_MESA || !IMAGEN_URL || !CAPACIDAD || !ESTADO) {
      return res.status(400).json({ error: "Missing required field(s)" });
    }
    const editMesas = {
      NOMBRE_MESA,
      IMAGEN_URL,
      CAPACIDAD,
      ESTADO,
    };
    await pool.query("UPDATE TBL_MESA SET ? WHERE ID_MESA=?", [
      editMesas,
      ID_MESA,
    ]);
    const nuevoToken = req.nuevoToken;
    res.json({ message: "Updated mesa successfully",editMesas,nuevoToken});
  } catch (error) {
    console.error("Error updating mesa:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateMesaEstadoByid = async (req, res) => {
  const { ID_MESA } = req.params;
  const { ESTADO } = req.body;
  try {
    if (!ID_MESA) {
      return res.status(400).json({ error: "Missing required parameter 'ID_MESA'" });
    }
    if (!ESTADO) {
      return res.status(400).json({ error: "Missing required field 'ESTADO'" });
    }
    const newEstado = { ESTADO };
    const respuesta = await pool.query(
      "UPDATE TBL_MESA SET ? WHERE ID_MESA =?",
      [newEstado, ID_MESA]
    );
    const nuevoToken = req.nuevoToken;
    res.json({ message: "Updated mesa estado successfully", newEstado,nuevoToken});
  } catch (error) {
    console.error("Error updating mesa estado:", error);
    res.status(500).json({ error: "Server error" });
  }
};
