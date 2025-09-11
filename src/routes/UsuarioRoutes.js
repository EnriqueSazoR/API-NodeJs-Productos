// Rutas para usuarios
import { Router } from "express";
import { buscarProducto, 
    buscarProductoPorMarca, 
    buscarProductoPorCategoria,
    actualizarCredenciales } from "../controllers/UsuariosController.js";
import { VerificarToken } from "../middlewares/middlewareAuth.js";
import { validarDatos } from "../middlewares/middlewareUsuario.js";
const router = Router()

router.post('/buscarProducto', VerificarToken, buscarProducto)
router.post('/buscarPorMarca', VerificarToken, buscarProductoPorMarca)
router.post('/buscarPorCategoria', VerificarToken, buscarProductoPorCategoria)
router.put('/actualizar/:id',validarDatos, actualizarCredenciales)


export default router