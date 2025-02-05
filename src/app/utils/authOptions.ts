import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials: any) => {
        try {
          const res = await fetch(process.env.API_URL + '/auth/signIn', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          });
           
          if (res.status === 200) {
            const user = await res.json();
            return user;
          }
        } catch (error: any) {
          throw new Error('Internal Server Error' + error);
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },

    async session({ session, token }: any) {
      session.user = token;
      return session;
    }
  },
};

export default authOptions;
