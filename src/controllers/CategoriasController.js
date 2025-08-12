// Archivo para los metodos de categorias
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Método para agregar
export const PostCategorias = async (req, res) => {
  const { nombre } = req.body;

  try {
    if (!nombre) {
      return res.status(400).send({ error: "El nombre es obligatorio" });
    }

    // Verificar si la categoria ya existe
    const categoriaExistente = await prisma.Categoria.findFirst({
      where: { nombre },
    });

    if (categoriaExistente) {
      return res.status(400).send({ error: `Categoria ${nombre} ya existe` });
    }

    // Crear la categoria
    await prisma.Categoria.create({
      data: {
        nombre,
      },
    });
    res.send({ mensaje: "Categoría creada" });
  } catch (error) {
    console.log(`Error al registrar categoria ${error}`);
    res.status(500).send({ error: "Error en el servidor" });
  }
};
