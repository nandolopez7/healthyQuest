"use client"

import type React from "react"

import { useState } from "react"
import { Heart, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Post {
  id: number
  username: string
  avatar: string
  image: string
  description: string
  likes: number
  liked: boolean
  comments: number
}

interface CommunityScreenProps {
  onEarnPoints: (points: number) => void
  currentPoints: number
}

export default function CommunityScreen({ onEarnPoints, currentPoints }: CommunityScreenProps) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: "Usuario X",
      avatar: "👩‍🍳",
      image: "/healthy-salad-bowl.png",
      description: "¡Mi ensalada saludable de hoy! Llena de nutrientes y deliciosa 🥗💚",
      likes: 234,
      liked: false,
      comments: 12,
    },
    {
      id: 2,
      username: "Sofia",
      avatar: "🏃‍♀️",
      image: "/running-in-park-morning.jpg",
      description: "Corrida matutina completada! 5km en 25 minutos ⏱️🔥",
      likes: 189,
      liked: false,
      comments: 8,
    },
    {
      id: 3,
      username: "Marco",
      avatar: "💪",
      image: "/workout-gym-fitness-weights.jpg",
      description: "Sesión de pesas en el gym. ¡Día de piernas! 💯",
      likes: 456,
      liked: false,
      comments: 23,
    },
  ])

  const [floatingPoints, setFloatingPoints] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleLike = (postId: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()

    // Add floating points animation
    const newPoint = { id: Date.now(), x: rect.left, y: rect.top }
    setFloatingPoints([...floatingPoints, newPoint])
    setTimeout(() => {
      setFloatingPoints((prev) => prev.filter((p) => p.id !== newPoint.id))
    }, 1000)

    // Update post like status and earn points
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const pointsEarned = post.liked ? -5 : 5
          if (!post.liked) {
            onEarnPoints(currentPoints + pointsEarned)
          }
          return { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) }
        }
        return post
      }),
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Floating Points */}
      {floatingPoints.map((point) => (
        <div
          key={point.id}
          className="fixed pointer-events-none animate-bounce"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            animation: "floatUp 1s ease-out forwards",
          }}
        >
          <div className="text-xl font-bold text-emerald-500 drop-shadow-lg">+5 Puntos</div>
        </div>
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px);
          }
        }
      `}</style>

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Comunidad</h2>
        <p className="text-muted-foreground">Comparte y celebra tu viaje de salud</p>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Post Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <div className="text-3xl">{post.avatar}</div>
                <div>
                  <p className="font-semibold text-foreground">{post.username}</p>
                  <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                </div>
              </div>

              {/* Post Image */}
              <div className="relative w-full h-96 bg-muted overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.description}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Post Caption */}
              <div className="p-4">
                <p className="text-foreground">{post.description}</p>
              </div>

              {/* Post Actions */}
              <div className="flex gap-2 px-4 pb-4 border-b border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleLike(post.id, e)}
                  className={`flex items-center gap-2 ${
                    post.liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                  }`}
                >
                  <Heart size={20} fill={post.liked ? "currentColor" : "none"} />
                  <span>{post.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <MessageCircle size={20} />
                  <span>{post.comments}</span>
                </Button>
              </div>

              {/* Comments Section */}
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Agrega un comentario..."
                  className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
