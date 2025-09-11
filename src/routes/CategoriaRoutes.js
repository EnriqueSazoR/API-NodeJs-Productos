import { Router } from "express";
import { PostCategoria, GetCategorias, PutCategoria } from "../controllers/CategoriasController.js";
import { validarDatos } from "../middlewares/middlewareCategoria.js";
const router = Router()

// Definir Rutas
router.post('/crear', validarDatos, PostCategoria)
router.get('/lista', GetCategorias)
router.put('/actualizar/:id', validarDatos, PutCategoria)


export default router