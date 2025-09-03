// Controlador para Registro y Login
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;

const prisma = new PrismaClient();

export const Registro = async (req, res) => {
  try {
    // Validar Datos
    const { usuario, correo, password } = req.body;
    const usuarioExistente = await prisma.Usuario.findUnique({
      where: { correo },
    });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ error: "El correo ya está asociado a otra cuenta" });
    }

    // Hashear contraseña
    const hashPassword = await bcrypt.hash(password, 10);

    // Crear el usuario nuevo
    const nuevoUsuario = await prisma.Usuario.create({
      data: {
        usuario,
        correo,
        password: hashPassword,
      },
      select: {
        usuario: true,
      },
    });

    // Token
    const token = jwt.sign(
      {
        id: nuevoUsuario.id,
        correo: nuevoUsuario.correo,
      },
      secretKey,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      mensaje: `Usuario ${usuario} creado exitosamente`,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" + error });
  }
};
