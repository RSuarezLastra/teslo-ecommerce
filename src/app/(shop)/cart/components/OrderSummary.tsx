'use client';

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";

export const OrderSummary = () => {

  const { getOrderSummary } = useCartStore()
  const { totalItems, taxes, subtotal, total } = getOrderSummary();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Cargando...</p>;

  return (
    <div className="grid grid-cols-2">

      <span>No. Productos</span>
      <span className="text-right">{totalItems === 1 ? '1 artículo' : `${totalItems} artículos`}</span>

      <span>Subtotal</span>
      <span className="text-right">{subtotal}</span>

      <span>Impuestos (16%)</span>
      <span className="text-right">{taxes}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="text-right mt-5 text-2xl">{total}</span>

    </div>
  )
}
