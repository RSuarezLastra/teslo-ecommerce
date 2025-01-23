'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";


export const setTransactionId = async (orderId: string, transactionId: string) => {

  const session = await auth();

  try {
    if (!session?.user) {
      throw Error(`No autorizado`);
    }

    const orderUpdated = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        transactionId: transactionId
      }
    });
    
    if (!orderUpdated) {
      throw Error(`Orden ${orderId} no existe`);
    }
    
    return {
      ok: true,
      order: orderUpdated
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al generar transacción'
    }
  }
}