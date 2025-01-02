'use client';

import Image from 'next/image'
import Link from "next/link";
import { QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import { useEffect, useState } from 'react';



export const ProductsInCart = () => {

  const productsInCart = useCartStore(state => state.cart);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if(!loaded) return <p>Cargando...</p>;

  return (
    <>
      {
        productsInCart.map(product => (
          <div key={`${product.slug}-${product.size}`} className="flex mb-5">
            <Image
              src={`/products/${product.image}`}
              width={100}
              height={100}
              style={{
                width: '100px',
                height: '100px'
              }}
              alt={product.title}
              className="mr-5 rounded"
            />

            <div>
              <Link
                href={`/product/${product.slug}`}
                className="hover:underline cursor-pointer">
                {product.title} - {product.size}
              </Link>

              <p>${product.price}</p>

              <QuantitySelector
                quantity={product.quantity}
                onQuantityChange={(quantity) => console.log(quantity)}
              />

              <button className="underline mt-3">
                Remover
              </button>
            </div>
          </div>
        ))
      }
    </>
  )
}
