import NextAuth from "next-auth/next";
import { authOptions } from "@/src/utils/config/auth.options";

const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST };