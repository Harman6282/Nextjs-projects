import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const findUser = await prisma.user.findFirst({
          where: {
            email: user.email,
          },
        });

        if (findUser) {
          return true;
        }

        await prisma.user.create({
          data:{
            name: user.name,
            email: user.email,
          }
        })

      } catch (error) {
        console.log("Sign in error: ", error);
        return false;
      }
    },
    
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
};
