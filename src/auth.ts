import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw "GitHub OAuth credentials missing";
}

const authObject = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google,
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  // callbacks: {
  //   authorized: async ({ auth }) => {
  //     // Logged in users are authenticated, otherwise redirect to login page
  //     return !!auth;
  //   },
  // },
});

export const { handlers, auth, signOut, signIn } = authObject;
