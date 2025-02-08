'use server'

import prisma from "@/lib/prisma";
import { User } from "@/interfaces"

export const getUserCart = async (userId: User['id']) => {
  try {

    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: {
        CartProducts: true
      }
    });

    return cart;

  } catch (error) {
    console.log(error);
    return [];
  }
}