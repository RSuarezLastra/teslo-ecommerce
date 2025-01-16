'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { placerOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils"


export const PlaceOrder = () => {
  const router = useRouter(); 

  const { getOrderSummary } = useCartStore();
  const { totalItems, taxes, subtotal, total } = getOrderSummary();

  const address = useAddressStore(state => state.address);
  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);

  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }))


    const resp = await placerOrder(productsToOrder, address);
    if(!resp.ok){
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }
    
    clearCart();
    router.replace('/orders/' + resp.order?.id)
  }

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Cargando...</p>;

  return (

    <div className="bg-white rounded-xl shadow-lg p-7">

      <h2 className="text-2xl mb-2">Dirección de envío</h2>
      <div className="mb-10">
        <p>{address.firstName} {address.lastName}</p>
        <p className="text-sm">{address.address}</p>
        <p className="text-sm">{address.address2}</p>
        <p className="text-sm">{address.city}, {address.country}</p>
        <p className="text-sm">{address.zip}</p>
        <p className="text-sm">{address.phone}</p>
      </div>

      <div className="w-full h-0.5 bg-gray-200 mb-8 rounded" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>

      <div className="grid grid-cols-2">

        <span>No. Productos</span>
        <span className="text-right">{totalItems === 1 ? '1 artículo' : `${totalItems} artículos`}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subtotal)}</span>

        <span>Impuestos (16%)</span>
        <span className="text-right">{currencyFormat(taxes)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="text-right mt-5 text-2xl">{currencyFormat(total)}</span>

      </div>

      <div className="mt-5 mb-2 w-full">

        {/* Disclaimer */}
        <p className="mb-4">
          <span className="text-xs">
            Al hacer click en "Generar orden", aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#">política de privacidad</a>
          </span>
        </p>

        <p className="text-red-500 text-sm mb-2">{errorMessage}</p>

        <button
          // href="/orders/123"
          disabled={isPlacingOrder}
          onClick={onPlaceOrder}
          className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
        >
          Generar orden
        </button>
      </div>

    </div>
  )
}
