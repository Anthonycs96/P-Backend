import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../app.js";

export const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn: "3m" }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

export const refreshTokenMiddleware = async (req, res, next) => {
  // Obtiene el token de los encabezados HTTP
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  // Si no hay un token, lanza un error
  if (!token) {
    throw new Error("Token no encontrado, acceso denegado");
  }

  let nuevoToken = null;

  try {
    // Verifica si el token actual es válido y no ha expirado
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);

    const now = Date.now().valueOf() / 1000;
    console.log("now:", now);

    // Si el token está a menos de 10 minutos de expirar, genera un nuevo token y lo envía como respuesta
    if (decoded.exp - now < 900) {
      console.log("Token próximo a expirar, generando nuevo token...");

      // Genera un nuevo token con un tiempo de expiración de 30 minutos
      nuevoToken = jwt.sign({ user: decoded.user }, JWT_SECRET, {
        expiresIn: "1h",
      });
      
      console.log(`Nuevo token generado: ${nuevoToken}`);
    
    
      // Agrega el nuevo token al objeto req
      req.nuevoToken = nuevoToken;

      // Continúa con el siguiente middleware/controlador de ruta
      next();
    } else {
      // Si el token no está próximo a expirar, simplemente pasa al siguiente middleware/controlador de ruta
      req.token = token;
      next();
    }
  } catch (error) {
    // Si hay un error al verificar el token
    console.error(error.message); // muestra un mensaje de error en la consola
    // envía una respuesta JSON de "No autorizado" junto con el nuevo token (si hay uno)
    if (nuevoToken) {
      return res.status(401).json({ msg: error.message + "hey", nuevoToken });
    } else {
      console.log(nuevoToken)
      return res.status(401).json({ msg: error.message });
    }
  }
};


