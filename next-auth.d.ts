import { type DefaultSession } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    accessToken: string;
    accessTokenExpires: number; 
    error?: "RefreshAccessTokenError";
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string; 
    user: any; 
    error?: "RefreshAccessTokenError";
  }
}