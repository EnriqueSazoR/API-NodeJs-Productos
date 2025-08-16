// Controlador para CRUD de marcas
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Método post
export const PostMarca = async (req, res) => {
  try {
    const { nombre } = req.body;
    // Verificar si la marca existe
    const marcaExistente = await prisma.Marca.findFirst({
      where: { nombre },
    });

    if (marcaExistente) {
      return res.status(400).json({ error: `Marca ${nombre} ya existe` });
    }

    // crear marca
    await prisma.Marca.create({
      data: {
        nombre,
      },
    });
    res.json({ mensaje: "Marca creada" });
  } catch (error) {
    console.error(`Error al crear marca ${error}`);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Método get
export const GetMarcas = async (req, res) => {
  try {
    const listaMarcas = await prisma.Marca.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });
    res.send({ marcas: listaMarcas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Método put
export const PutMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const marca = await prisma.Marca.findUnique({
      where: { id: parseInt(id) },
    });

    if (!marca) {
      return res.status(400).json({ error: "Marca no encontrada" });
    }

    // Validar que marca no exista
    const marcaExistente = await prisma.Marca.findFirst({
      where: { nombre },
    });

    if (marcaExistente) {
      return res.status(400).json({ error: `La marca ${nombre} ya existe` });
    }

    // Actuliazar marca
    const marcaActualizada = await prisma.Marca.update({
      where: { id: parseInt(id) },
      data: {
        nombre: nombre ?? marca.nombre,
      },
      select: {
        nombre: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.json({
      mensaje: "Marca actualizada",
      marca: marcaActualizada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
