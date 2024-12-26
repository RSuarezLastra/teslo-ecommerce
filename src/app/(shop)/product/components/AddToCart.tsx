'use client';

import { QuantitySelector, SizeSelector } from "@/components"
import { Product, Size } from "@/interfaces"
import { useState } from "react"

interface Props {
  product: Product,

}

export const AddToCart = ({ product }: Props) => {

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  const [isPosted, setIsPosted] = useState(false);

  const addToCart = () => {
    setIsPosted(true);

    if (!size) return;

    console.log('Agregando al carrito', { size, quantity });
  }

  return (
    <>
      {
        isPosted && !size && (
          <span className="text-sm text-red-500 fade-in">
            Debe seleccionar una talla*
          </span>
        )
      }

      {/* Selector de Tallas */}
      <SizeSelector
        onSizeChange={setSize}
        selectedSize={size}
        availableSizes={product.sizes}
      />

      {/* Selector de Cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={setQuantity}
      />

      <button
        onClick={addToCart}
        className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  )
}
