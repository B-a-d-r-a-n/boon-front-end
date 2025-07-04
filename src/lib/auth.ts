import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import axios from "axios";
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
            return {
              ...loginResponse.data.user,
              accessToken: loginResponse.accessToken,
            };
          }
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") return true;
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
            (user as any).accessToken = authResponse.accessToken;
            (user as any).dbUser = authResponse.data.user;
            return true;
          }
          return false;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.user = (user as any).dbUser || user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
});