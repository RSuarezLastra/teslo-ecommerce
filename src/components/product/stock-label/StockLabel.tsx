'use client'

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {

  const [inStock, setInStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      const stock = await getStockBySlug(slug)
      setInStock(stock);
      setIsLoading(false);
    }

    getStock();
  }, [slug])


  return (
    <>
      {
        isLoading ? (
          <h1 className={`bg-gray-100 animate-pulse antialiased font-bold w-24`}>
            &nbsp;
          </h1 >
        )
          : (
            <h1 className={`${titleFont.className} antialiased font-bold`}>
              Stock: {inStock}
            </h1>
          )
      }
    </>
  )
}
