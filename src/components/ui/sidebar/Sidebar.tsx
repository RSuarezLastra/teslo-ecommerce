'use client'

import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"
import { SidebarItem } from "./SidebarItem"

const navLinks = [
  { title: 'Perfil', path: '/', icon: <IoPersonOutline size={20} /> },
  { title: 'Ordenes', path: '/', icon: <IoTicketOutline size={20} /> },
  { title: 'Ingresar', path: '/', icon: <IoLogInOutline size={20} /> },
  { title: 'Salir', path: '/', icon: <IoLogOutOutline size={20} /> },
]
const adminNavLinks = [
  { title: 'Productos', path: '/', icon: <IoShirtOutline size={20} /> },
  { title: 'Ordenes', path: '/', icon: <IoTicketOutline size={20} /> },
  { title: 'Usuarios', path: '/', icon: <IoPersonOutline size={20} /> },
]


export const Sidebar = () => {
  return (
    <div>

      {/* Background black */}
      <div className="fixed w-screen top-0 left-0 h-screen z-10 bg-black opacity-30" />

      {/* Blur */}
      <div className="fade-in fixed w-screen top-0 left-0 h-screen z-10 backdrop-filter backdrop-blur-sm" />

      {/* Sidemenu */}
      <nav className="fixed bg-white w-[400px] top-0 right-0 z-20 h-screen p-5 transform transition-all shadow-2xl duration-300">

        <IoCloseOutline
          size={35}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => console.log('click')}
        />

        <div className="relative mt-14">
          <IoSearchOutline
            size={20}
            className="absolute top-2 left-2"
          />

          {/* Input search */}
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 pl-10 py-1 pr-10 rounded text-xl border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menú */}

        {
          navLinks.map(item => (
            <SidebarItem key={item.title} {...item} />
          ))
        }

        <div className="w-full h-px bg-gray-200 my-10"/>

        {/* Admin Menu */}

        {
          adminNavLinks.map(item => (
            <SidebarItem key={item.title} {...item} />
          ))
        }



      </nav>

    </div>
  )
}
