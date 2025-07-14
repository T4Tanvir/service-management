import NextAuth, { type DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { isValidUser } from "./lib/services/user_crud_service";

// ========================
// 🔒 Type Augmentation for Session
// ========================
declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      phone_number: string;
      role: string;
      city: string;
      address: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    phone_number: string;
    role: string;
    email?: string;
    city?: string;
    address?: string;
  }
}

// ========================
// 🔒 Type Augmentation for JWT
// ========================
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    phone_number: string;
    role: string;
    email?: string;
    city?: string;
    address?: string;
  }
}

// ========================
// 🧠 Auth Config
// ========================
export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        phone_number: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.phone_number || !credentials?.password) return null;

          const phone_number = credentials.phone_number as string;
          const password = credentials.password as string;

          const response = await isValidUser({
            phone_number,
            password,
          });

          if (!response.success || !response.data) return null;

          const user = response.data;

          return {
            id: user.id.toString(),
            name: user.full_name,
            phone_number: user.phone_number,
            role: user.role,
            email: user.email || "",
            city: user.city || "",
            address: user.address || "",
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phone_number = user.phone_number;
        token.role = user.role;
        token.email = user.email;
        token.city = user.city;
        token.address = user.address;
      }
      return token;
    },

    async session({ session, token }) {
      const userToken = token as JWT;

      if (session.user) {
        session.user.id = userToken.id as string;
        session.user.name = userToken.name as string;
        session.user.phone_number = userToken.phone_number as string;
        session.user.role = userToken.role as string;
        session.user.email = userToken.email as string;
        session.user.city = userToken.city ?? "";
        session.user.address = userToken.address ?? "";
      }

      return session;
    },
  },
 trustHost: true,
  // good to keep if using in edge/runtime
});
