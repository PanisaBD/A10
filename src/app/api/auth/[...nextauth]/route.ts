import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions);

// The handler should handle both GET and POST methods in the API route
export { handler as GET, handler as POST };
