// Rutas para autenticar
import { Router } from "express";
import { Registro } from "../controllers/AuthController.js";
import { VerificarToken, validarDatos } from "../middlewares/middlewareAuth.js";
const router = Router()


router.post('/registro', validarDatos, Registro)

// ruta de prueba para probar el metodo de verificarToken
router.get('/prueba', VerificarToken, (req, res) => {
    res.send({mensaje : "Acceso autorizado"})
})

export default router