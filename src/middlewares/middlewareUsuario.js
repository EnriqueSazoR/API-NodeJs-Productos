// middleware para usuarios
import { check, validationResult } from "express-validator";

// Middleware para validar datos
export const validarDatos = [
  check("usuario")
    .escape()
    .isLength({ min: 5 })
    .withMessage("El nombre de usuario debe tener al menos 5 caracteres")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio"),
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