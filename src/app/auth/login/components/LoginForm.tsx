'use client';

import Link from "next/link"
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from 'react';
import clsx from "clsx";
import { BsExclamationCircle } from "react-icons/bs";
import { authenticate } from "@/actions";


export const LoginForm = () => {

  const searchParams = useSearchParams();

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect( () => {

    if ( errorMessage === 'Success' ) window.location.replace( callbackUrl );

  }, [ errorMessage, callbackUrl ] );

  return (
    <form action={formAction} className="flex flex-col">

      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />


      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      {errorMessage && (
        <div className="flex items-center my-2 gap-2">
          <BsExclamationCircle className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        className={clsx({
          "btn-primary": !isPending,
          "btn-disabled": isPending,
        })}
        disabled={isPending}>
        Ingresar
      </button>


      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>

    </form>
  )
}
