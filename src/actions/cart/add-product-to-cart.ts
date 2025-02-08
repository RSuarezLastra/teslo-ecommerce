'user server'

import prisma from "@/lib/prisma";
import { User } from "@/interfaces"
import { CartProduct } from "@/interfaces"
import { getUserCart } from "./get-user-cart";


export const addProductToCart = async (userId: User['id'], cartProduct: CartProduct) => {
  try {

    const cart = await getUserCart(userId);

    if (!cart) {
      const cartCreated = await prisma.cart.create({
        data: {
          userId: userId
        }
      });

      await prisma.cartProduct.create({
        data: {
          cartId: cartCreated.id,
          size: cartProduct.size,
          price: cartProduct.price,
          quantity: cartProduct.quantity,
          productId: cartProduct.id
        }
      })
    } else {

      const cart = await getUserCart(userId);

      

    }


  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al actualizar el carrito'
    }
  }

}