// Archivo para los metodos de categorias
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Método para agregar
export const PostCategorias = async (req, res) => {
  try {
    const { nombre } = req.body;
    // Verificar si la categoría ya existe
    const categoriaExistente = await prisma.Categoria.findFirst({
      where: { nombre },
    });

    if (categoriaExistente) {
      return res.status(400).json({ error: `Categoria ${nombre} ya existe` });
    }

    // Crear la categoria
    await prisma.Categoria.create({
      data: {
        nombre,
      },
    });
    res.json({ mensaje: "Categoría creada" });
  } catch (error) {
    console.log(`Error al registrar categoria ${error}`);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Metodo para obtener todas las categorías
export const GetCategorias = async (req, res) => {
  try {
    const listaCategorias = await prisma.Categoria.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });
    res.send({ categorias: listaCategorias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Método para actulizar una categoría
export const PutCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const categoria = await prisma.Categoria.findUnique({
      where: { id: parseInt(id) },
    });

    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    // Validar que la categoria no exista
    const categoriaExistente = await prisma.Categoria.findFirst({
      where: { nombre },
    });
    if (categoriaExistente) {
      return res
        .status(400)
        .json({ error: `Categoría ${nombre} ya existe` });
    }

    // Actualizar categoria
    const categoriaActualizada = await prisma.Categoria.update({
      where: { id: parseInt(id) },
      data: {
        nombre: nombre ?? categoria.nombre,
      },
      select: {
        nombre: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.json({
      exito: "Categoría Actualizada",
      categoria: categoriaActualizada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en servidor" });
  }
};
