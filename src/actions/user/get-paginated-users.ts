import prisma from "@/lib/prisma";
import { verifyAdminAuth } from "@/utils";



export const getPaginatedUsers = async () => {

  await verifyAdminAuth();

  try {

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