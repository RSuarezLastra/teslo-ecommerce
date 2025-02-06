import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import prisma from './lib/prisma';
import { AuthUser } from './interfaces';
import { AdapterUser } from 'next-auth/adapters';

const authenticatedRoutes = [
  '/checkout',
  '/profile',
  '/admin',
  '/orders',
];

const isOnAuthenticatedRoutes = (onRoute: string) => {
  return authenticatedRoutes.some((authRoutes) =>
    onRoute.startsWith(authRoutes)
  );
};

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        //search email
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (!user) return null;

        //compare password
        const passwordMatch = bcryptjs.compareSync(password, user.password);

        if (!passwordMatch) return null;

        const { password: _, ...userWithoutPassword } = user;
        void _;

        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;

      if (!isLoggedIn && isOnAuthenticatedRoutes(nextUrl.pathname)) {
        return false;
      }

      return true;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: ({ session, token }) => {

      session.user = token.user as AdapterUser & AuthUser;


      return session;
    },
  }
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);