'use server';

import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({ name, email, password }: RegisterUser) => {
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase()
      }
    });

    if(userExists) {
      return {
        ok: false,
        message: 'El correo electrónico ya está registrado'
      }
    }

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password)
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return {
      ok: true,
      message: 'Usuario registrado correctamente',
      user
    }

  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'Error al registrar el usuario'
    }
  }
}