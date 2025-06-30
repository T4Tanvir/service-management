import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { isValidUser } from "./lib/services/user_crud_service";
import { ClientError } from "./errors/error";
import { Role } from "@prisma/client";

// Extend the Session user type to include full_name, role, and customField
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      full_name?: string;
      role?: Role;
      customField?: string;
    };
  }
  interface User {
    id: string;
    full_name?: string;
    role?: Role;
    customField?: string;
  }
}

export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phone_number: { label: "phone_number" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("=====================");
        if (!credentials) return null;
        console.log(credentials);
        const phone_number = credentials.phone_number as string;
        const password = credentials.password as string;
        if (!phone_number || !password) return null;

        const response = await isValidUser({ phone_number, password });
        if (!response.success) throw ClientError.invalidCredentials();

        return response.data;
      },
    }),
  ],
  callbacks: {
       async jwt({ token, user }) {
      if (user) {
        token.phone_number = (user as any).phone_number;
        token.role = (user as any).role;
        token.name = (user as any).name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).phone_number = token.phone_number;
        (session.user as any).role = token.role;
        (session.user as any).name = token.name;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },
});
