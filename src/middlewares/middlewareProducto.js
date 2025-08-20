import { check, validationResult } from "express-validator";

// Validar datos
export const validarDatos = [
  check("nombre")
    .escape()
    .notEmpty()
    .withMessage("El nombre del producto no debe estar vacio"),

  check("stock")
    .escape()
    .isInt({ min: 1 })
    .withMessage("El stock debe ser mayor a 0")
    .notEmpty()
    .withMessage("El stock es obligatorio")
    .toInt(),

  check("categoria")
    .escape()
    .notEmpty()
    .withMessage("La categoria es obligatoria"),

  check("marca")
    .escape()
    .notEmpty()
    .withMessage("La marca es obligatoria"),

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
