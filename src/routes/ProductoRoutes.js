// Rutas para productos
import { Router } from "express";
import { PostProducto } from "../controllers/ProductosController.js";
import { validarDatos } from "../middlewares/middlewareProducto.js";
const router = Router()


router.post('/crear', validarDatos, PostProducto)


export default router