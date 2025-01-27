import { User } from "@/interfaces";
import prisma from "@/lib/prisma";
import { verifyAdminAuth } from "@/utils";

interface PaginatedUsersResult {
  ok: boolean;
  users?: User[];
  message?: string;
}

export const getPaginatedUsers = async (): Promise<PaginatedUsersResult> => {

  const authResult = await verifyAdminAuth();
  if (!authResult.ok) return authResult;

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