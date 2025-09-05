// Middleware para trabajar autenticación
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;
import { check, validationResult } from "express-validator";

// Middleware para validar datos
export const validarDatos = [
  check("usuario")
    .escape()
    .isLength({ min: 5 })
    .withMessage("El nombre de usuario debe tener al menos 5 caracteres")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio"),
  check("correo")
    .escape()
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .isEmail()
    .withMessage("El formato de correo es invalido, debe tener un dominio"),
  check("password")
    .escape()
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe contener al menos una minúscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe contener al menos un número")
    .matches(/[\w_]/)
    .withMessage("La contraseña debe contener al menos un carácter especial"),
  (req, res, netx) => {
    const errores = validationResult(req);
    if (errores.isEmpty()) {
      netx();
    } else {
      const errorMesage = errores.array().map((error) => error.msg);
      return res.status(400).json(errorMesage);
    }
  },
];


// Verificación de Token --> se usará luego para proteger rutas
export const VerificarToken = async (req, res, netx) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Debe inciar sesión, para utilizar este recurso" });
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.usuario = payload;
    netx();
  } catch (error) {
    return res.status(403).json({ mensaje: "Token invalido" });
  }
};

