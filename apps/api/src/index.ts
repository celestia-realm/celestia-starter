import { serve } from "@hono/node-server"

import app from "./app"

const port = Number(process.env.PORT ?? 4000)

serve({ fetch: app.fetch, port }, (info) => {
  // eslint-disable-next-line no-console -- startup banner
  console.log(`API running at http://localhost:${info.port}`)
})
