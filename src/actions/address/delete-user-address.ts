'use server';

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    
    const addressStored = await prisma.userAddress.findUnique({
      where: { userId }
    });

    if(addressStored){
      await prisma.userAddress.delete({
        where: { userId }
      });

      return {
        ok: true,
        message: 'Dirección eliminada'
      }
    }
    

  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Error al eliminar la dirección'
    }
  }
}