'use client'

import { useEffect, useState } from 'react';
import { titleFont } from "@/config/fonts"
import { useCartStore, useUiStore } from "@/store"
import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"


export const TopMenu = () => {

  const openSideMenu = useUiStore(state => state.openSideMenu);
  const totalItemsInCart = useCartStore(state => state.getTotalItemsInCart());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex px-2 md:px-5 justify-between items-center w-full">

      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden md:block">
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">Hombres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">Mujeres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid">Niños</Link>
      </div>

      {/* Search, Cart, Menu  */}
      <div className="flex items-center">

        <button className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </button>

        <Link href={
          totalItemsInCart > 0 && loaded ?
            "/cart" :
            "/empty"
        } className="mx-4">
          <div className="relative">
            {
              loaded && (totalItemsInCart > 0) && (
                <span className="absolute text-xs px-1 -top-2 -right-2 rounded-full bg-blue-700 text-white fade-in">
                  {totalItemsInCart}
                </span>)
            }
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={openSideMenu}
          className="m-2 p-2 rounded-md hover:bg-gray-100 transition-all">
          Menú
        </button>

      </div>
    </nav>
  )
}
