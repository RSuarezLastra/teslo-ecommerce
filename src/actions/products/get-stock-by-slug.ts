'use server'

import prisma from "@/lib/prisma"

export const getStockBySlug = async (slug: string): Promise<number> => {

  try {

    const stock = await prisma.product.findFirst({
      where: { slug },
      select: {inStock: true}
    });

    if (!stock) throw new Error('No se encontro el stock de este producto');

    return stock?.inStock ?? 0
  
  } catch (error) {
    throw new Error('Error al obtener el stock')
  }
}