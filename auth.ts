import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { isValidUser } from "./lib/services/user_crud_service";

export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phone_number: { label: "phone_number" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials) return null;

          const phone_number = credentials.phone_number as string;
          const password = credentials.password as string;

          if (!phone_number || !password) return null;

          const response = await isValidUser({ phone_number, password });

          if (!response.success || !response.data) {
            return null;
          }

          return {
            id: response.data.id.toString(),
            name: response.data.full_name,
            phone_number: response.data.phone_number,
            role: response.data.role,
            email: response.data.email || "",
            city: response.data.city || "",
            address: response.data.address || "",
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.phone_number = (user as any).phone_number;
        token.role = (user as any).role;
        token.name = (user as any).name;
        token.city = (user as any).city;
        token.address = (user as any).address;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).phone_number = token.phone_number;
        (session.user as any).role = token.role;
        (session.user as any).name = token.name;
        (session.user as any).city = token.city;
        (session.user as any).address = token.address;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
