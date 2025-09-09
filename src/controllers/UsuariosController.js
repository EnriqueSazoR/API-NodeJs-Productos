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
          equals: nombre,
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



// 1. Método para buscar productos por marca
export const buscarProductoPorMarca = async (req, res) => {
  try {
    const { nombre } = req.body;
    const marcaBD = await prisma.Marca.findMany({
      where: { nombre },
      include: {
        productos: {
          select: {
            nombre: true,
            stock: true,
          },
        },
      },
    });

    const productos = marcaBD.flatMap((m) => m.productos);

    res.status(200).json({
      respuesta: `Productos relaciondos con ${nombre}`,
      productos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en servidor" });
  }
};

// 2. Método para buscar producto por categoria
export const buscarProductoPorCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;
    const categoriaBD = await prisma.Categoria.findMany({
      where: { nombre },
      include: {
        productos: {
          select: {
            nombre: true,
            stock: true,
          },
        },
      },
    });

    const productos = categoriaBD.flatMap((c) => c.productos);
    res.status(200).json({
      respuesta: `Productos relaciondos con ${nombre}`,
      productos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

// Metodos a futuro

// 3. Método para comprar

// 4. Actualizar credenciales {nombre de usuario, password}
