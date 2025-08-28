// Controlador para productos
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Metodo para agregar un producto
export const PostProducto = async (req, res) => {
  try {
    const { nombre, stock, categoria, marca } = req.body;

    // validar que el producto no existe
    const productoExistente = await prisma.Producto.findFirst({
      where : {nombre}
    })
    if(productoExistente) {
      return res.status(400).json({error : `EL producto ${nombre} ya existe`})
    }
    // Buscar id de categoria
    const categoriaObj = await prisma.Categoria.findFirst({
      where: { nombre: categoria.trim() },
    });
    if (!categoriaObj) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    // Buscar id de marca
    const marcaObj = await prisma.Marca.findFirst({
      where: { nombre: marca.trim() },
    });
    if (!marcaObj) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }

    // crear el producto
    const producto = await prisma.Producto.create({
      data: {
        nombre,
        stock,
        categoria: {
          connect: { id: categoriaObj.id },
        },
        marca: {
          connect: { id: marcaObj.id },
        },
      },
    });
    res.status(200).json({ mensaje: "Producto creado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en servidor" });
  }
};

// Método para mostrar todas las categorias
export const GetProdutcos = async (req, res) => {
  try {
    const listaProductos = await prisma.Producto.findMany({
      select: {
        nombre: true,
        categoria: {
          select: {
            nombre: true,
          },
        },
        marca: {
          select: {
            nombre: true,
          },
        },
      },
    });
    res.send({
      Productos: listaProductos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const PutProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, stock, categoria, marca } = req.body;

    // Buscar objeto por ID
    const buscarProducto = await prisma.Producto.findUnique({
      where: { id: parseInt(id) },
    });

    if (!buscarProducto) {
      res.status(404).json({ error: "Producto no encontrado" });
    }

    // Validar si la categoria ingresada existe
    const categoriaObj = await prisma.Categoria.findFirst({
      where : {nombre : categoria.trim()}
    })
    if(!categoriaObj) {
      return res.status(404).json({error : "La categoria no existe"})
    }

    const marcaObj = await prisma.Marca.findFirst({
      where : {nombre : marca.trim()}
    })
    if(!marcaObj) {
      return res.status(404).json({error : "La marca no existe"})
    }

    // Actualizar Producto
    const productoActualizado = await prisma.Producto.update({
      where: { id: parseInt(id) },
      data: {
        nombre: nombre ?? producto.nombre,
        stock: stock ?? producto.stock,
        categoria : {
          connect : {id : categoriaObj.id}
        },
        marca : {
          connect : {id : marcaObj.id}
        }
      },
      select: {
        nombre: true,
        stock: true,
        categoria : {
          select : {
            nombre : true
          }
        },
        marca : {
          select : {
            nombre : true
          }
        },
        fechaActualizacion: true,
      },
    });
    res.json({
      exito: "Producto Actualizado",
      producto: productoActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en servidor" });
  }
};
