import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogIn";

export const authOptions: AuthOptions = {
  providers: [
    // Authentication Provider, use Credentials Provider
    CredentialsProvider({
      // The name to display on the sign-in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign-in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials,req) {
       if (!credentials) return null
       const user = await userLogin(credentials.email,credentials.password)

        if (user) {
          // Any object returned will be saved in the `user` property of the JWT
          return user;
        } else {
          // If you return null, an error will be displayed advising the user to check their details.
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt" // This configures the session strategy
  },
  callbacks : {
    async jwt({token,user}) {
      return {...token, ...user}
    },
    async session({session, token, user}) {
      session.user = token as any
      return session
    }
  }
};