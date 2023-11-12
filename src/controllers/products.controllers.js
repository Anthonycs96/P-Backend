import db from "../conexdb.js";
const pool = db;

export const createProduct = async(req,res)=>{
  try {
      const {
          NOMBRE_PRODUCTO,
          COMPRA_PRODUCTO,
          VENTA_PRODUCTO,
          DESCRIPCION_PRODUCTO,
          IMAGENURL,
          ESTADO,
          ID_SUCURSAL,
          ID_TIPO_PRODUCTO,
      } = req.body;
      if (
        !NOMBRE_PRODUCTO ||
        !COMPRA_PRODUCTO ||
        !VENTA_PRODUCTO ||
        !DESCRIPCION_PRODUCTO ||
        !IMAGENURL ||
        !ESTADO ||
        !ID_SUCURSAL ||
        !ID_TIPO_PRODUCTO
      ) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
      }
      const [sucursal] = await pool.query(
        'SELECT * FROM TBL_SUCURSAL WHERE ID_SUCURSAL = ?',
        [ID_SUCURSAL]
      );
      if (!sucursal) {
        return res.status(404).json({ message: 'La sucursal no existe' });
      }
      const [tipoProducto] = await pool.query(
        'SELECT * FROM TBL_TIPO_PRODUCTO WHERE ID_TIPO_PRODUCTO = ?',
        [ID_TIPO_PRODUCTO]
      );
      if (!tipoProducto) {
        return res.status(404).json({ message: 'El tipo de producto no existe' });
      }
      const newProducto = {
          NOMBRE_PRODUCTO,
          COMPRA_PRODUCTO,
          VENTA_PRODUCTO,
          DESCRIPCION_PRODUCTO,
          IMAGENURL,
          ESTADO,
          ID_SUCURSAL,
          ID_TIPO_PRODUCTO,
      };
      await pool.query("INSERT INTO TBL_PRODUCTOS SET ?", [newProducto]);
      const nuevoToken = req.nuevoToken;
      res.json({ data: newProducto, nuevoToken });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error del servidor' });
  }
}


export const getProducts = async (req, res) => {
  try {
      const listarProductos = await pool.query('SELECT * FROM TBL_PRODUCTOS');
      
      // Agregar información adicional al objeto de respuesta
      const response = {
          products: listarProductos,
          count: listarProductos.length,
          message: 'Productos recuperados exitosamente',
      };
      
      const nuevoToken = req.nuevoToken;
      res.json({ ...response, nuevoToken });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error del servidor' });
  }
}

export const getProductByid = async (req, res) => {
  try {
      const { productId } = req.params;
      const [listarProductosID] = await pool.query('SELECT * FROM TBL_PRODUCTOS WHERE ID_PRODUCTO = ?', [productId]);
      
      // Agregar información adicional al objeto de respuesta
      const response = {
          product: listarProductosID,
          message: 'Producto recuperado exitosamente',
      };
      
      if (!listarProductosID) {
          return res.status(404).json({ message: 'Producto no encontrado' });
      }
      const nuevoToken = req.nuevoToken;
      res.json({ ...response, nuevoToken });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error del servidor' });
  }
};
  

export const updateProductByid = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      NOMBRE_PRODUCTO,
      COMPRA_PRODUCTO,
      VENTA_PRODUCTO,
      DESCRIPCION_PRODUCTO,
      IMAGENURL,
      ESTADO,
      ID_SUCURSAL,
      ID_TIPO_PRODUCTO,
    } = req.body;

    // Validar que NOMBRE_PRODUCTO y DESCRIPCION_PRODUCTO no estén vacíos
    if (!NOMBRE_PRODUCTO || !DESCRIPCION_PRODUCTO) {
      return res.status(400).json({ message: 'El nombre y la descripción del producto son requeridos' });
    }

    // Validar que el producto exista antes de intentar actualizarlo
    const [product] = await pool.query('SELECT * FROM TBL_PRODUCTOS WHERE ID_PRODUCTO = ?', [productId]);
    if (!product) {
      return res.status(404).json({ message: 'El producto no existe' });
    }

    const editProducto = {
      NOMBRE_PRODUCTO,
      COMPRA_PRODUCTO,
      VENTA_PRODUCTO,
      DESCRIPCION_PRODUCTO,
      IMAGENURL,
      ESTADO,
      ID_SUCURSAL,
      ID_TIPO_PRODUCTO,
    };
    await pool.query('UPDATE TBL_PRODUCTOS SET ? WHERE ID_PRODUCTO = ?', [editProducto, productId]);
    const nuevoToken = req.nuevoToken;
    res.json({ message: 'Producto actualizado', nuevoToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

