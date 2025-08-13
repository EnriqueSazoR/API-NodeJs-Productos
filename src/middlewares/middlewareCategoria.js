// Middlewares especificos para el modelo categoría
import { check, validationResult } from "express-validator";

// Validar Datos
export const validarDatos = [
  check("nombre")
    .escape()
    .isLength({ min: 5 })
    .withMessage("El nombre de la categoría debe tener al menos 5 caracteres"),
  (req, res, next) => {
    const errores = validationResult(req);
    if (errores.isEmpty()) {
      next();
    } else {
      const errorMesage = errores.array().map((error) => error.msg);
      return res.status(400).json({ error: errorMesage });
    }
  },
];
