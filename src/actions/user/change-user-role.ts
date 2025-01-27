'use server';

import prisma from "@/lib/prisma";
import { verifyAdminAuth } from "@/utils";
import { revalidatePath } from 'next/cache';

export const changeUserRole = async (userId: string, role: string ) => {

    const authResult = await verifyAdminAuth();
    if (!authResult.ok) return authResult;

    try {
      
      const newRole = role === 'admin' ? 'admin' : 'user';

      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          role: newRole
        }
      });

      revalidatePath('/admin/users');

      return {
        ok: true,
        message: 'Rol del usuario cambiado'
      }

    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: 'Error al cambiar el rol del usuario'
      }
    }

}

