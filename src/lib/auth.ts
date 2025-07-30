import NextAuth, { User as AuthUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import axios from "axios";
import { User } from "@/types/auth";

type UserWithCustomProps = AuthUser & {
  accessToken: string;
  dbUser?: User;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        try {
          const { data: loginResponse } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
            credentials
          );
          if (loginResponse?.data?.user && loginResponse?.accessToken) {
            // This object is passed to the 'user' parameter in callbacks
            return {
              ...loginResponse.data.user,
              accessToken: loginResponse.accessToken,
            } as AuthUser;
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (account?.provider === "google" || account?.provider === "facebook") {
        try {
          const { data: authResponse } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth`,
            {
              name: user.name,
              email: user.email,
              avatarUrl: user.image,
              provider: account.provider,
            }
          );

          if (authResponse?.accessToken) {
            const u = user as UserWithCustomProps;
            u.accessToken = authResponse.accessToken;
            u.dbUser = authResponse.data.user;
            return true;
          }
          return false;
        } catch (error) {
          console.error("OAuth sign-in error:", error);
          return false;
        }
      }
      return false;
    },

    async jwt({ token, user }) {
      if (user) {
        const u = user as UserWithCustomProps;
        token.accessToken = u.accessToken;
        token.user = u.dbUser || u;
      }
      return token;
    },

    async session({ session, token }) {
      const backendUser = token.user as User;

      session.accessToken = token.accessToken as string;
      session.user.id = backendUser._id;

      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
});
