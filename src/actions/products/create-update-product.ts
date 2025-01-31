'use server';

import { z } from 'zod';
import { Gender, Product, Size } from '@prisma/client';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';


const ProductSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform(val => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender)
});


export const createUpdateProduct = async (formData: FormData) => {

  const data = Object.fromEntries(formData);
  const productParsed = ProductSchema.safeParse(data);

  if (!productParsed.success) {
    return { ok: false }
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, '_').trim();

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {

      let product: Product;
      const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());

      if (id) {

        product = await tx.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        });

      } else {

        product = await tx.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        });

      }

      return { product }

    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product
    }

  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'No se pudo acutalizar/crear el producto'
    }
  }

}