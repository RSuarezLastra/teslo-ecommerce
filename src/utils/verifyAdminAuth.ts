import { auth } from "@/auth.config";


export const verifyAdminAuth = async () => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Debe estar autenticado como administrador'
    }
  }
}