'use server';

import { signOut } from "@/auth.config";

export async function logout() {
  
  await signOut({
    redirect: true,
    redirectTo: '/auth/login'
  });

}