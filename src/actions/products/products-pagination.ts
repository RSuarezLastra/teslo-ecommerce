'use server';

import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender
}: PaginationOptions) => {

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1

  try {

    const products = await prisma.product.findMany({
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      },
      take: take,
      skip: (page - 1) * take,
      where: {
        gender: gender
      }
    });

    const totalCount = await prisma.product.count({
      where: {
        gender: gender
      }
    });
    const totalPages = Math.ceil(totalCount / take);


    return {
      currentPage: page,
      totalPages,
      products: products.map(product => ({
        ...product,
        images: product.ProductImage.map(image => image.url)
      }))

    }

  } catch (error) {
    throw new Error('No se pudo cargar los productos');
  }
}