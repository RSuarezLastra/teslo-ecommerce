import prisma from "@/lib/prisma";
import { auth } from "@/auth.config"


export const getPaginatedOrders = async () => {
  const session = await auth();

  try {

    if (session?.user.role !== 'admin') {
      return {
        ok: false,
        message: 'Debe estar autenticado como administrador'
      }
    }

    const orders = await prisma.order.findMany({
      orderBy: {
        createAt: 'desc'
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });

    return {
      ok: true,
      orders: orders
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al cargar ordenes'
    }

  }
}