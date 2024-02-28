import NextAuth from "next-auth"
import { type } from "os";

declare module "next-auth" {
  interface Session {
    user: {
        id: string;
        email: string;
        refreshToken: string;
        accessToken: string;
        type: string;
        role: string;
    }
  }
}