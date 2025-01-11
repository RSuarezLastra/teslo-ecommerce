'use server';

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placerOrder = async (productsId: ProductToOrder[], address: Address) => {

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: 'No autorizado'
    }
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsId.map(p => p.productId)
      }
    }
  });

  const itemsInOrder = productsId.reduce((count, product) => count + product.quantity, 0)

  const { subTotal, tax, total } = productsId.reduce((totals, item) => {

    const productQuantity = item.quantity;
    const product = products.find(product => product.id === item.productId);

    if (!product) throw new Error(`El producto con el id: ${item.productId} no existe - 500`)

    const subTotal = product.price * productQuantity;

    totals.subTotal += subTotal;
    totals.tax += (subTotal * 0.16);
    totals.total += (subTotal * 1.16);

    return totals;
  }, { subTotal: 0, tax: 0, total: 0 })

  console.log(subTotal, tax, total);
  
}