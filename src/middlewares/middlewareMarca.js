// Middleware para marcas
import { check, validationResult } from "express-validator";

// Validar datos
export const validarDatos = [
  check("nombre")
    .escape()
    .isLength({ min: 2 })
    .withMessage("La marca debe tener al menos 2 caracteres"),
  (req, res, next) => {
    const errores = validationResult(req);
    if (errores.isEmpty()) {
      next();
    } else {
      const errorMessage = errores.array().map((error) => error.msg);
      return res.status(400).json({ error: errorMessage });
    }
  },
];
