import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../app.js";
import db from "../conexdb.js";
const pool = db;

export const veryfyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
      throw new Error("Token no encontrado, acceso denegado");
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ msg: "No autorizado" });
  }
};

export const isUsuario = async (req, res, next) => {
  try {
    const userId = req.user.ID_USUARIO;
    const result = await pool.query(
      "SELECT * FROM USUARIO WHERE ID_USUARIO = ?",
      [userId]
    );
    console.log(result);
    // const USUARIO = result[0];

    // if (!USUARIO) {
    //   return res.status(401).json({ msg: "No autorizado" });
    // }

    // if (USUARIO.ID_TIPO_USUARIO !== 5 && req.user.ID_USUARIO !== 1) {
    //   console.log(USUARIO);
    //   return res.status(403).json({ msg: "Prohibido" });
    // }

    // next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id_permiso;
    const result = await pool.query(
      "SELECT * FROM TBL_USUARIOS_PERMISOS WHERE id_permiso = ?",
      [userId]
    );
    console.log(result);
    // const USUARIO = result[0];

    // if (!USUARIO) {
    //   return res.status(401).json({ msg: "No autorizado" });
    // }

    // if (USUARIO.ID_TIPO_USUARIO !== 5 && req.user.ID_USUARIO !== 1 && req.user.ID_USUARIO !== 2 && req.user.ID_USUARIO !== 3 && req.user.ID_USUARIO !== 4) {
    //   console.log(USUARIO);
    //   return res.status(403).json({ msg: "Prohibido" });
    // }

    // next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
