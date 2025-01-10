'use client';

import Image from 'next/image'
import Link from "next/link";
import { QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import { useEffect, useState } from 'react';
import { currencyFormat } from '../../../../utils/currencyFormat';



export const ProductsInCartCheckout = () => {

  const productsInCart = useCartStore(state => state.cart);
  const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
  const removeProduct = useCartStore(state => state.removeProduct);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Cargando...</p>;

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
              <div>
                {product.title} - {product.size} -  ( {product.quantity} )
              </div>

              <p>{currencyFormat(product.price)}</p>
              <p className='font-semibold'>Subtotal: {currencyFormat(product.price * product.quantity)}</p>

            </div>
          </div>
        ))
      }
    </>
  )
}
