'use client';

import { QuantitySelector, SizeSelector } from "@/components"
import { Product, Size } from "@/interfaces"
import { useState } from "react"

interface Props {
  product: Product,

}

export const AddToCart = ({ product }: Props) => {

  const [size, setSize] = useState<Size | undefined>()

  return (
    <>
      {/* Selector de Tallas */}
      <SizeSelector
        onSizeChange={setSize}
        selectedSize={size}
        availableSizes={product.sizes}
      />

      {/* Selector de Cantidad */}
      <QuantitySelector
        quantity={1}
      />

      <button className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  )
}
