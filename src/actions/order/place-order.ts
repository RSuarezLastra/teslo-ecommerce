'use server';

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placerOrder = async (productIds: ProductToOrder[], address: Address) => {

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
        in: productIds.map(p => p.productId)
      }
    }
  });

  const itemsInOrder = productIds.reduce((count, product) => count + product.quantity, 0)

  // calcular totales
  const { subTotal, tax, total } = productIds.reduce((totals, item) => {

    const productQuantity = item.quantity;
    const product = products.find(product => product.id === item.productId);

    if (!product) throw new Error(`El producto con el id: ${item.productId} no existe - 500`)

    const subTotal = product.price * productQuantity;

    totals.subTotal += subTotal;
    totals.tax += (subTotal * 0.16);
    totals.total += (subTotal * 1.16);

    return totals;
  }, { subTotal: 0, tax: 0, total: 0 })


  // Hacer transaccion
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {

      // 1. Actualizar stock de los productos
      const updatedProductsPromises = products.map(product => {

        // acumular los valores
        const productQuantity = productIds.filter(p =>
          p.productId === product.id
        ).reduce((quantity, item) => quantity + item.quantity, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.title} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity
            }
          }
        })

      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      updatedProducts.forEach(product => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`)
        }
      })

      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          UserId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                ProductId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      // 3. Crear la dirección de la orden 
      const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id
        }
      })

      return {
        order: order,
        orderAddress: orderAddress,
        updatedProducts: updatedProducts
      }
    })
    
    return {
      ok: true,
      order: prismaTx.order,
      prismaTx
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al procesar la orden'
    }
  }


}