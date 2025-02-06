export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  password: string;
  role: string;
  image?: string | null;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null ;
  role: string;
  image?: string | null;
}

