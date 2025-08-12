import { Router } from "express";
import { PostCategorias } from "../controllers/CategoriasController.js";
const router = Router()

// Definir Rutas
router.post('/crear', PostCategorias)



export default router