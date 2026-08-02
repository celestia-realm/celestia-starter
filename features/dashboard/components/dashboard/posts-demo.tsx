"use client"

import { useCallback, useEffect, useState } from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"

import { api } from "@/lib/api-client"

type Post = { id: string; title: string }

export function PostsDemo() {
  const [posts, setPosts] = useState<Post[]>([])
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    const res = await api.api.posts.$get()
    const data = await res.json()
    // The endpoint returns either the posts array (200) or an error object
    // (401). Array.isArray narrows the typed union to the posts branch.
    if (Array.isArray(data)) {
      setPosts(data.map((post) => ({ id: post.id, title: post.title })))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    // Intentional fetch-on-mount. load() only updates state after awaiting the
    // network response, never synchronously during the effect body.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load()
  }, [load])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setSaving(true)
    await api.api.posts.$post({ json: { title } })
    setTitle("")
    await load()
    setSaving(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts</CardTitle>
        <CardDescription>
          Fetched from the backend through the typed Hono RPC client — no
          database access in the frontend.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form onSubmit={handleCreate} className="flex gap-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write a post title..."
          />
          <Button
            type="submit"
            disabled={saving}
            className="h-8 shrink-0 text-xs"
          >
            {saving ? "Adding..." : "Add"}
          </Button>
        </form>
        {loading ? (
          <p className="text-xs text-muted-foreground">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No posts yet. Add one above.
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {posts.map((post) => (
              <li key={post.id} className="text-xs">
                {post.title}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
