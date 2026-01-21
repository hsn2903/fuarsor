import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),

  // 1. Enable Email/Password Auth
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },

  // 2. Enable Plugins for Next.js Cookies handling
  plugins: [
    nextCookies(), // Ensures secure cookie handling on server actions
  ],

  // 3. Expose the "role" field to the client session
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false, // It's strictly required in DB, but safe to mark false here to avoid validation errors during legacy migrations
        defaultValue: "USER",
        input: false, // User cannot set this themselves during sign-up
      },
      // Allow these to be updated by the user:
      bio: { type: "string", required: false, input: true },
      phoneNumber: { type: "string", required: false, input: true },
      jobTitle: { type: "string", required: false, input: true },
      website: { type: "string", required: false, input: true },
    },
  },

  trustedOrigins: ["https://fuarsor.vercel.app", "http://localhost:3000"],
});
