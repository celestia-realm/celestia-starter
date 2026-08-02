import { createAuthClient } from "better-auth/react"
import { twoFactorClient } from "better-auth/plugins"

export const authClient = createAuthClient({
  plugins: [twoFactorClient()],
})

export const { signIn, signOut, useSession } = authClient
