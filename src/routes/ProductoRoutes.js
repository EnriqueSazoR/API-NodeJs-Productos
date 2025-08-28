// Rutas para productos
import { Router } from "express";
import { PostProducto, GetProdutcos, PutProducto } from "../controllers/ProductosController.js";
import { validarDatos } from "../middlewares/middlewareProducto.js";
const router = Router()


router.post('/crear', validarDatos, PostProducto)
router.get('/lista', GetProdutcos)
router.put('/actualizar/:id', validarDatos, PutProducto)


export default router