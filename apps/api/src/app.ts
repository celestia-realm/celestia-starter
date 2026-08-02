import { randomUUID } from "node:crypto"

import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { z } from "zod"

import { db, posts } from "@workspace/db"

import { auth } from "./auth"

const createPostSchema = z.object({
  title: z.string().min(1).max(200),
})

const app = new Hono()
  .use(
    "*",
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  )
  .get("/api/health", (c) => c.json({ status: "ok" }))
  .get("/api/posts", async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers })
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401)
    }
    const rows = await db.select().from(posts)
    return c.json(rows)
  })
  .post("/api/posts", zValidator("json", createPostSchema), async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers })
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401)
    }
    const data = c.req.valid("json")
    const [post] = await db
      .insert(posts)
      .values({
        id: randomUUID(),
        title: data.title,
        authorId: session.user.id,
      })
      .returning()
    return c.json(post, 201)
  })

// Better Auth catch-all handler. Registered at runtime but intentionally kept
// out of the RPC type contract below — the frontend talks to auth through the
// Better Auth client, not the Hono RPC client.
app.on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw))

export type AppType = typeof app
export default app
