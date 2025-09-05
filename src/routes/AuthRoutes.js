// Rutas para autenticar
import { Router } from "express";
import { Registro, Login } from "../controllers/AuthController.js";
import { validarDatos } from "../middlewares/middlewareAuth.js";
const router = Router()


router.post('/registro', validarDatos, Registro)
router.post('/login', Login)


export default router