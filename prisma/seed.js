// Archivo para crear un usuario
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function usuarioAdmin() {
  // Leer las variables de entorno
  const adminUser = process.env.ADMIN_USER;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Hashear contraseña
  const hashPassword = await bcrypt.hash(adminPassword, 10);

  // Revisar si ya existe un usuario admin
  const adminExistente = await prisma.Usuario.findFirst({
    where: { rol: "ADMIN" },
  });

  if (!adminExistente) {
    // crear usuario
    await prisma.Usuario.create({
      data: {
        usuario: adminUser,
        correo: adminEmail,
        password: hashPassword,
        rol: "ADMIN",
      },
    });
    console.log(`Usuario  ${adminUser} creado con éxito`);
  } else {
    console.log(
      "No se pudo crear el usuario porque ya existe un usuario Admin"
    );
  }
}

usuarioAdmin()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
