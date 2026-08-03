import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { twoFactor } from "better-auth/plugins"

import { db } from "@workspace/db"

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    twoFactor({
      issuer: "Celestia",
    }),
  ],
  // The browser reaches auth through the frontend proxy (http://localhost:3000).
  trustedOrigins: ["http://localhost:3000"],
})

export type Session = typeof auth.$Infer.Session
