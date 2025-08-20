// Controlador para productos
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Metodo para agregar un producto
export const PostProducto = async (req, res) => {
  try {
    const { nombre, stock, categoria, marca } = req.body;
    // Buscar id de categoria
    const categoriaObj = await prisma.Categoria.findFirst({
      where: { nombre : categoria.trim()},
    });
    if (!categoriaObj) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    // Buscar id de marca
    const marcaObj = await prisma.Marca.findFirst({
      where: { nombre : marca.trim()},
    });
    if (!marcaObj) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }

    // crear el producto
    const producto = await prisma.Producto.create({
      data: {
        nombre,
        stock,
        categoria : {
            connect : {id : categoriaObj.id}
        },
        marca : {
            connect: {id: marcaObj.id}
        }
      },
    });
    res.status(200).json({ mensaje: "Producto creado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en servidor" });
  }
};
