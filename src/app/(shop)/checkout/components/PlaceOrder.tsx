'use client';

import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils"
import { useEffect, useState } from "react";


export const PlaceOrder = () => {

    const { getOrderSummary } = useCartStore();
    const { totalItems, taxes, subtotal, total } = getOrderSummary();
    const address = useAddressStore(state => state.address);
  
    const [loaded, setLoaded] = useState(false);
  
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

        <button
          // href="/orders/123"
          className="flex btn-primary justify-center"
        >
          Generar orden
        </button>
      </div>

    </div>
  )
}
