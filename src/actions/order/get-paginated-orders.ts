import prisma from "@/lib/prisma";
import { verifyAdminAuth } from "@/utils";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedOrders = async ({
  page = 1,
  take = 15
}: PaginationOptions) => {

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1

  await verifyAdminAuth();

  try {

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
      },
      take: take,
      skip: (page - 1) * take,
    });

    const totalCount = await prisma.order.count();
    const totalPages = Math.ceil(totalCount / take);

    return {
      ok: true,
      orders: orders,
      currentPage: page,
      totalPages
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al cargar ordenes'
    }

  }
}