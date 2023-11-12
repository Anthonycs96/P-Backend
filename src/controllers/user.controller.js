import db from "../conexdb.js";
const pool = db;
import { validarContraseña } from "../models/user.js";
import {encryptPassword} from "../models/user.js";
export const createUsuario = async (req, res) => {
    try {
        const {
            USUARIO,
            CONTRASENA,
            ESTADO,
            ID_TIPO_USUARIO,
            ID_PERSONA_USUARIO,
          } = req.body;
          if (!USUARIO ||!CONTRASENA ||!ESTADO ||!ID_TIPO_USUARIO ||!ID_PERSONA_USUARIO) {
            return res.status(400).json("Faltan datos");
          }
          if (!validarContraseña(CONTRASENA)) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres y contener al menos un número, una letra minúscula y una letra mayúscula" });
          }
          const newColaborador = {
            USUARIO,
            CONTRASENA: await encryptPassword(CONTRASENA),
            ESTADO,
            ID_TIPO_USUARIO,
            ID_PERSONA_USUARIO,
          };
          const result = await pool.query("INSERT INTO USUARIO SET?",[newColaborador]);
         
          res.status(201).json({ message: "USUARIO creado", userId: result.insertId });
        
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY'){
            return res.status(400).json("USUARIO ya existe");
        }
        return res.status(500).send('Server Error')
    }

}

export const getUsuario = async (req, res) => {
    
}

export const getUsuarioByid = async (req, res) => {
    
}

export const updateUsuarioByid = async (req, res) => {
    
}