import { hc } from "hono/client"

// Type-only import of the backend route definitions. The frontend never runs
// backend code — it only uses these types to get end-to-end typed API calls.
import type { AppType } from "@workspace/api/app"

// Same-origin client. Next.js rewrites /api/* to the backend (see
// next.config.ts), so the browser only ever talks to the frontend origin and
// session cookies are sent automatically.
export const api = hc<AppType>("")
