'use client'

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {

  const [inStock, setInStock] = useState(0);

  useEffect(() => {
    getStock();
  }, [])

  const getStock = async () => {
    const stock = await getStockBySlug(slug)
    
    setInStock(stock);
  }

  return (
    <h1 className={`${titleFont.className} antialiased font-bold`}>
      Stock: {inStock}
    </h1>
  )
}
