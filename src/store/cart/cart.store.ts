import { CartProduct, OrderSummary } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];

  getTotalItemsInCart: () => number;
  getOrderSummary: () => OrderSummary;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItemsInCart: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getOrderSummary: () => {
        const { cart } = get();
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const taxes = subtotal * 0.16;
        const total = subtotal + taxes;
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

        return {
          subtotal,
          taxes,
          total,
          totalItems
        };
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

      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCart = cart.map((item: CartProduct) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }

          return item;
        });

        set({ cart: updatedCart });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        const updatedCart = cart.filter(
          (item: CartProduct) => !(item.id === product.id && item.size === product.size)
        );

        set({ cart: updatedCart });
      },
      clearCart: () => {
        set({ cart: [] });
      }
    }),
    {
      name: 'shopping-cart'
    }
  )

);