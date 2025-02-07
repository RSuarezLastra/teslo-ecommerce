"use server"

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {

  try {

    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            id: true,
            url: true
          }
        }
      },
      where: {
        slug: slug
      }
    });

    if(!product) return null;
    
    return {
      ...product,
      images: product.ProductImage.map(image => image.url)
    }

  } catch (error) {
    console.error('Error al obtener el producto:', error); 
    throw new Error('No se pudo cargar el producto');
  }
}