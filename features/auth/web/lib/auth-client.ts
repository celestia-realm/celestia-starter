import { createAuthClient } from "better-auth/react"
import { twoFactorClient } from "better-auth/plugins"

// The frontend is a pure UI client: it talks to auth over HTTP (proxied to the
// backend in apps/api) and never imports server auth code. The Session type is
// inferred from the client itself, so it always matches what useSession returns.
export const authClient = createAuthClient({
  plugins: [twoFactorClient()],
})

export const { signIn, signOut, useSession } = authClient

export type Session = NonNullable<ReturnType<typeof useSession>["data"]>
