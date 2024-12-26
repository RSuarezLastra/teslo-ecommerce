'use client';

import { QuantitySelector, SizeSelector } from "@/components"
import { CartProduct, Product, Size } from "@/interfaces"
import { useCartStore } from "@/store";
import { useState } from "react"

interface Props {
  product: Product,

}

export const AddToCart = ({ product }: Props) => {

  const { addProductToCart } = useCartStore();

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  const [isPosted, setIsPosted] = useState(false);

  const addToCart = () => {
    setIsPosted(true);

    if (!size) return;

    const cart: CartProduct = {
      id: product.id,
      title: product.title,
      quantity: quantity,
      size: size,
      price: product.price,
      slug: product.slug,
      image: product.images[0]
    }

    addProductToCart(cart);
    
    setQuantity(1);
    setSize(undefined);
    setIsPosted(false);
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
