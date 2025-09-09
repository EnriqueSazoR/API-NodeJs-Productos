// Rutas para usuarios
import { Router } from "express";
import { buscarProducto, buscarProductoPorMarca, buscarProductoPorCategoria } from "../controllers/UsuariosController.js";
import { VerificarToken } from "../middlewares/middlewareAuth.js";
const router = Router()

router.post('/buscarProducto', VerificarToken, buscarProducto)
router.post('/buscarPorMarca', VerificarToken, buscarProductoPorMarca)
router.post('/buscarPorCategoria', VerificarToken, buscarProductoPorCategoria)


export default router