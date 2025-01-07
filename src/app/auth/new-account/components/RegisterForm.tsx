'use client';

import { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import { login, registerUser } from "@/actions";

type FormInputs = {
  name: string;
  email: string;
  password: string;
}


export const RegisterForm = () => {

  const [errorMessage, setErrorMessage] = useState<string>('');
  const { register, formState: { errors }, handleSubmit } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    const { name, email, password } = data;

    const resp = await registerUser({ name, email, password });
    console.log({resp});
    
    if(!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    await login(email.toLowerCase(), password);
    window.location.replace('/');
    
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

      <label htmlFor="name">Nombre completo</label>

      {errors.name && (
        <span className="text-red-500 mb-1 text-sm">*El nombre es obligatorio</span>
      )}

      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          { "border-red-500": errors.name }
        )}
        type="text"
        {...register("name", { required: true, minLength: 2 })}
      />

      <label htmlFor="email">Correo electrónico</label>

      {errors.email && (
        <span className="text-red-500 mb-1 text-sm">*Ingrese un correo valido</span>
      )}

      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          { "border-red-500": errors.email }
        )}
        type="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />


      <label htmlFor="password">Contraseña</label>

      {errors.password && (
        <span className="text-red-500 mb-1 text-sm">*La contraseña es obligatoria</span>
      )}

      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          { "border-red-500": errors.password }
        )}
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />

      {errorMessage && (
        <span className="text-red-500 mb-2 text-sm text-center">{errorMessage}</span>
      )}

      <button
        type="submit"
        className="btn-primary">
        Crear cuenta
      </button>


      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login"
        className="btn-secondary text-center mb-4">
        Ingresar
      </Link>

    </form>
  )
}
