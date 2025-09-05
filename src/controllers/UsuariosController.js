// Controlador para usuarios
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Método para buscar productos
export const buscarProducto = async (req, res) => {
  try {
    const { nombre } = req.body;
    const productoBD = await prisma.Producto.findFirst({
      where: {
        nombre: {
          equals: nombre
        },
      },
      select: {
        nombre: true,
        stock: true,
      },
    });
    if (!productoBD) {
      return res
        .status(401)
        .json({ error: "No se encontró el producto buscado" });
    }

    res.status(200).json({ productoBD });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en servidor" });
  }
};

// Metodos a futuro

// 1. Método para buscar marcas

// 2. Método para buscar categoria

// 3. Método para comprar

// 4. Actualizar credenciales {nombre de usuario, password}
