import prisma from "@/lib/prisma";
import { auth } from "@/auth.config"


export const getPaginatedUsers = async () => {
  const session = await auth();

  try {

    if (session?.user.role !== 'admin') {
      return {
        ok: false,
        message: 'Debe estar autenticado como administrador'
      }
    }

    const users = await prisma.user.findMany({
      orderBy: {
        name: 'desc'
      },
    });

    return {
      ok: true,
      users: users
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al cargar usuarios'
    }

  }
}