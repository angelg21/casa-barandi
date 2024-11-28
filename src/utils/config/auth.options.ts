import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import prisma from "../lib/prisma";
import { createToken } from "./jwt.handle";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },

  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
          const { email, password } = credentials as { email: string, password: string };
          try {
              const res = await fetch(process.env.API_URL + "/auth/login", {
                  method: "POST",
                  body: JSON.stringify({
                      email,
                      password,
                  }),
                  headers: {
                      "Content-Type": "application/json",
                  },
              });
              if (res.status == 401) {
                  const errorResponse = await res.json();
                  throw new Error(errorResponse.message);
              }

              const user = await res.json();
              return user;
          } catch (error) {
              if (error instanceof Error) {
                  if (error.message === "fetch failed") {
                      throw new Error("Error al iniciar sesión.");
                  }
                  throw new Error(error.message);
              } else {
                  throw new Error("An unknown error occurred.");
              }
          }
      },
  }),
  ],
  secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user }): Promise<any> {
            console.log("User", user, "Token:", token)
            if (user) return { ...token, ...user };
            return token;
        },

        async session({ token, session }) {
            session.user = token;
            session.user.token = token.token;

            return session;
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async signIn({ user, account }: { user: any; account: any }) {
            if (account.provider === "google") {
                try {
                  const { name, email, image } = user;
            
                  // Verificar si el usuario ya existe
                  const ifUserExists = await prisma.users.findUnique({
                    where: { email },
                  });
            
                  if (ifUserExists) {
                    // Usuario existente
                    user.id = ifUserExists.id;
                    user.roles = ifUserExists.roles;
                    user.token = createToken(ifUserExists.id);
                    user.imageUrl = image;
                    user.fullName = ifUserExists.fullName;
                    return true;
                  }
            
                  // Crear un nuevo usuario
                  const newUser = await prisma.users.create({
                    data: {
                      fullName: name,
                      email: email,
                      password: "",
                      imageUrl: image,
                      roles: ["user"],
                    },
                  });
            
                  if (newUser.id) {
                    user.id = newUser.id;
                    user.roles = newUser.roles;
                    user.token = createToken(newUser.id);
                    user.imageUrl = image;
                    user.fullName = newUser.fullName;
                    return true;
                  }
                } catch (err) {
                  console.error("Error in signIn:", err);
                  return false;
                }
              }
            return true;
        }
    },
}

export const { signIn, signOut, auth} = NextAuth( authOptions)
