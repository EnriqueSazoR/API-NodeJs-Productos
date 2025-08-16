// Rutas para marcas
import { Router } from "express";
import { PostMarca, GetMarcas, PutMarca } from "../controllers/MarcasController.js";
import { validarDatos } from "../middlewares/middlewareMarca.js";
const router = Router()


// Definir rutas
router.post('/crear', validarDatos, PostMarca)
router.get('/lista', GetMarcas)
router.put('/actualizar/:id', validarDatos, PutMarca)
export default router