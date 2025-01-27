import type { OrderWithAddress } from "@/interfaces";
import prisma from "@/lib/prisma";
import { verifyAdminAuth } from "@/utils";

interface PaginationOptions {
  page?: number;
  take?: number;
}

interface PaginatedOrdersResult {
  ok: boolean;
  orders?: OrderWithAddress[];
  currentPage?: number;
  totalPages?: number;
  message?: string;
}

export const getPaginatedOrders = async ({
  page = 1,
  take = 15
}: PaginationOptions): Promise<PaginatedOrdersResult> => {

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1

  const authResult = await verifyAdminAuth();
  if (!authResult.ok) return authResult;

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