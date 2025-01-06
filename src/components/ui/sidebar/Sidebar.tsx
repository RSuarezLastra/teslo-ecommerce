'use client'


import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"
import { SidebarItem } from "./SidebarItem"
import { useUiStore } from "@/store"
import clsx from "clsx"
import { logout } from "@/actions/auth/logout"
import { useSession } from "next-auth/react"



export const Sidebar = () => {

  const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen);
  const closeSideMenu = useUiStore(state => state.closeSideMenu);

  const navLinks = [
    {
      title: 'Perfil',
      path: '/profile',
      icon: <IoPersonOutline size={20} />,
      onClick: closeSideMenu
    },
    {
      title: 'Ordenes',
      path: '/',
      icon: <IoTicketOutline size={20} />
    },
    {
      title: 'Ingresar',
      path: '/auth/login',
      icon: <IoLogInOutline size={20} />,
      onClick: closeSideMenu
    },
  ]
  const adminNavLinks = [
    { title: 'Productos', path: '/', icon: <IoShirtOutline size={20} /> },
    { title: 'Ordenes', path: '/', icon: <IoTicketOutline size={20} /> },
    { title: 'Usuarios', path: '/', icon: <IoPersonOutline size={20} /> },
  ]

  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;


  return (
    <div>

      {/* Background black */}
      {
        isSideMenuOpen && (
          <div className="fixed w-screen top-0 left-0 h-screen z-10 bg-black opacity-30" />
        )
      }

      {/* Blur */}
      {
        isSideMenuOpen && (
          <div
            onClick={closeSideMenu}
            className="fade-in fixed w-screen top-0 left-0 h-screen z-10 backdrop-filter backdrop-blur-sm"
          />
        )
      }

      {/* Sidemenu */}
      <nav
        className={
          clsx(
            "fixed bg-white w-[300px] top-0 right-0 z-20 h-screen p-5 transform transition-all shadow-2xl duration-300",
            {
              "translate-x-full": !isSideMenuOpen
            }
          )
        }>

        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeSideMenu}
        />

        <div className="relative mt-14">
          <IoSearchOutline
            size={18}
            className="absolute top-2 left-2"
          />

          {/* Input search */}
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 pl-10 py-1 pr-10 rounded border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menú */}
        {
          navLinks.map(item => (
            <SidebarItem key={item.title} {...item} />
          ))
        }
        {
          isAuthenticated && (
            <button
              onClick={() => {
                logout();
                closeSideMenu();
              }}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoLogOutOutline size={20} />
              <span className="ml-3">Salir</span>
            </button>
          )
        }

        <div className="w-full h-px bg-gray-200 my-10" />

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
