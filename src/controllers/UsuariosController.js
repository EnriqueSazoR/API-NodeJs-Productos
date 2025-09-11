// Controlador para usuarios
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

// 1. Método para buscar productos
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

// 2. Método para buscar productos por marca
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

// 3. Método para buscar producto por categoria
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

// 4. Método para comprar

// 5. Actualizar credenciales {nombre de usuario, password}
export const actualizarCredenciales = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario, password } = req.body;

    // Buscar el Id del usuario
    const buscarUsuario = await prisma.Usuario.findUnique({
      where: { id: parseInt(id) },
    });
    if (!buscarUsuario) {
      return res.status(400).json({ error: "No se encontró el usuario" });
    }

    // Validar que no exista el nombre de usuario
    const usuarioDuplicado = await prisma.Usuario.findUnique({
      where: { usuario },
    });
    if (usuarioDuplicado) {
      return res
        .status(400)
        .json({ error: "El nombre de usuario ingresado ya existe" });
    }

    // Hashear la nueva contraseña
    const nuevaContraseña = await bcrypt.hash(password, 10);

    const credencialesActualizadas = await prisma.Usuario.update({
      where: { id: parseInt(id) },
      data: {
        usuario: usuario ?? buscarUsuario.usuario,
        password: nuevaContraseña,
      },
      select: {
        usuario: true,
      },
    });

    res.status(200).json({
      completo: "Actualización de usuario correcta",
      credencialesActualizadas,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};
