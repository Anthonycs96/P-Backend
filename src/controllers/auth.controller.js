import db from "../conexdb.js";
import {encryptPassword} from "../models/user.js";
import { validarContraseña } from "../models/user.js";
import { comparePassword } from "../models/user.js";
import { generateToken } from "../middlewares/token.Jwt.js";
const pool = db;

export const signUp = async (req, res) => {
  const { USUARIO, CONTRASENA} = req.body;

  if (!USUARIO ||!CONTRASENA) {
    return res.status(400).json("Faltan datos");
  }
  if (!validarContraseña(CONTRASENA)) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres, contener al menos un número, una letra minúscula y una letra mayúscula." });

  }

  try {
   const newUser = {
      USUARIO,
      CONTRASENA: await encryptPassword(CONTRASENA),
      ESTADO: 'activo'
    };
    console.log(newUser)
    const result = await pool.query('INSERT INTO TBL_USUARIOS SET ?', [newUser]);
    console.log(result)

    const payload = { 
      user: {
        id: result.insertId,
      },
    };
    const token = await generateToken(payload);
  return res.json({ token });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ msg: 'El usuario ya existe.' });
    }
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};



export const signIn = async(req, res) =>{
  const { USUARIO, CONTRASENA} = req.body;

  try {
    const results = await pool.query("SELECT * FROM TBL_USUARIOS WHERE USUARIO = ?", [
      USUARIO,
    ]);
    const user = results[0];
    

    if (!user) {
      return res.status(401).json({ msg: "Credenciales inválidaswww" });
    }

    const validPassword = await comparePassword(
      CONTRASENA,
      user.CONTRASENA
    );

    if (!validPassword) {
      return res.status(401).json({ msg: "Credenciales inválidasaa" });
    }

    const payload = {
      user: {
        ID_USUARIO: user.ID_USUARIO,
        USUARIO: user.USUARIO,
        CONTRASENA: user.CONTRASENA
      },
    };
    const token = await generateToken(payload);
    console.log(`Token generado: ${token}`, payload);
    res.status(200).json({ token, ID_USUARIO: user.ID_USUARIO,
      USUARIO: user.USUARIO,CONTRASENA: user.CONTRASENA });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
};
