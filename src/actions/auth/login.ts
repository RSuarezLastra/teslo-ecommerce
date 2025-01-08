'use server';


import { AuthError } from 'next-auth';
import { signIn } from '@/auth.config';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success';

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function login(email: string, password: string) {
  try {
    await signIn('credentials', { email, password });

    return { ok: true };

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al iniciar sesión'
    }

  }
}