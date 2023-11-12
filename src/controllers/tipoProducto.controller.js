import db from "../conexdb.js";
const pool = db;

// Crear un nuevo tipo de producto
export const createTipoProducto = async (req, res) => {
    try {
      const { TIPO_PRODUCTO, DESCRIPCION_TIPO_PRODUCTO } = req.body;
      if (!TIPO_PRODUCTO || !DESCRIPCION_TIPO_PRODUCTO) {
        return res.status(400).json({ message: "Missing fields" });
      }
      const newTipoProducto = {
        TIPO_PRODUCTO,
        DESCRIPCION_TIPO_PRODUCTO,
      };
      await pool.query("INSERT INTO TBL_TIPO_PRODUCTO SET ?", [newTipoProducto]);
      const nuevoToken = req.nuevoToken;
      res.status(201).json({ message: "Product created", newTipoProducto, nuevoToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
 // Obtener una lista de todos los tipos de productos
export const getTipoProducto = async (req, res) => {
    try {
      const listarTipoProducto = await pool.query("SELECT * FROM TBL_TIPO_PRODUCTO");
      const nuevoToken = req.nuevoToken;
      res.json({ listarTipoProducto, nuevoToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

// Obtener un tipo de producto por ID
export const getTipoProductoById = async (req, res) => {
    try {
      const { IDTIPOPRODUCTO } = req.params;
      const listarIDTIPOPRODUCTO = await pool.query(
        "SELECT * FROM TBL_TIPO_PRODUCTO WHERE ID_TIPO_PRODUCTO = ?",
        [IDTIPOPRODUCTO]
      );
      if (listarIDTIPOPRODUCTO.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(listarIDTIPOPRODUCTO);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  // Obtener productos de un tipo específico por ID
export const getTipoProductoProductsById = async (req, res) => {
    try {
      const { IDTIPOPRODUCTO } = req.params;
      const listarIDTIPOPRODUCTO = await pool.query(
        `
          SELECT *
          FROM TBL_PRODUCTOS p
          JOIN TBL_TIPO_PRODUCTO tp ON p.ID_TIPO_PRODUCTO = tp.ID_TIPO_PRODUCTO
          WHERE tp.ID_TIPO_PRODUCTO = ?`,
        [IDTIPOPRODUCTO]
      );
      const nuevoToken = req.nuevoToken;
      res.json({ listarIDTIPOPRODUCTO, nuevoToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

// Actualizar un tipo de producto por ID
export const updateTipoProductoById = async (req, res) => {
    try {
      const { ID_TIPO_PRODUCTO } = req.params;
      const { TIPO_PRODUCTO, DESCRIPCION_TIPO_PRODUCTO } = req.body;
  
      // Validar que ID_TIPO_PRODUCTO sea un número entero positivo
      if (!Number.isInteger(+ID_TIPO_PRODUCTO) || +ID_TIPO_PRODUCTO <= 0) {
        return res.status(400).json({ message: "ID_TIPO_PRODUCTO debe ser un número entero positivo" });
      }
  
      // Validar que se ingresen los campos obligatorios
      if (!TIPO_PRODUCTO || !DESCRIPCION_TIPO_PRODUCTO) {
        return res.status(400).json({ message: "TIPO_PRODUCTO y DESCRIPCION_TIPO_PRODUCTO son campos obligatorios" });
      }
  
      // Actualizar el tipo de producto en la base de datos
      const editTipoProducto = { TIPO_PRODUCTO, DESCRIPCION_TIPO_PRODUCTO };
      await pool.query("UPDATE TBL_TIPO_PRODUCTO SET ? WHERE ID_TIPO_PRODUCTO = ?", [editTipoProducto, ID_TIPO_PRODUCTO]);
  
      // Obtener el nuevo token y enviar la respuesta al frontend
      const nuevoToken = req.nuevoToken;
      res.json({ message: "Tipo de producto actualizado exitosamente", editTipoProducto, nuevoToken });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  
  