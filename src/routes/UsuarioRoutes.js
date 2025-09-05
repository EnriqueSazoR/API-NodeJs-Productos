// Rutas para usuarios
import { Router } from "express";
import { buscarProducto } from "../controllers/UsuariosController.js";
import { VerificarToken } from "../middlewares/middlewareAuth.js";
const router = Router()

router.post('/buscarProducto', VerificarToken, buscarProducto)


export default router