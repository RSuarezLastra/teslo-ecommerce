import { CartProduct } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];

  getTotalItemsInCart: () => number;
  addProductToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItemsInCart: () => {
        const { cart } = get();
        return cart.reduce((total,item) => total + item.quantity, 0);
      },
      addProductToCart: (product: CartProduct) => {

        const { cart } = get();

        const isProductInCart = cart.some(
          (item: CartProduct) => (item.id === product.id && item.size === product.size)
        );

        if (!isProductInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updatedCart = cart.map((item: CartProduct) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + 1 };
          }

          return item;
        });

        set({ cart: updatedCart });

      }
    }),
    {
      name: 'shopping-cart'
    }
  )

);