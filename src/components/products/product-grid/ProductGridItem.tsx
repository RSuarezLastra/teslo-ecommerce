'use client'

import Link from "next/link";
import { useState } from "react";
import { Product } from "@/interfaces"
import { ProductImage } from "@/components";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <ProductImage
          src={displayImage}
          alt={product.title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
          onMouseEnter={()=> setDisplayImage(product.images[1])}
          onMouseLeave={()=> setDisplayImage(product.images[0])}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          className="hover:underline text-sm md:text-base"
          href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-semibold">${product.price}</span>
      </div>
    </div>

  )
}
