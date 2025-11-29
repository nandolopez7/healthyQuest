"use client"

import { Droplets, Flame, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HomeScreenProps {
  userPoints: number
}

export default function HomeScreen({ userPoints }: HomeScreenProps) {
  const waterGoal = 8
  const waterIntake = 5
  const teamGoalDistance = 50
  const teamCurrentDistance = 32.5
  const friendAvatars = [
    { id: 1, name: "Ana", progress: 15, avatar: "🧑‍🦰" },
    { id: 2, name: "Carlos", progress: 22, avatar: "👨‍🦱" },
    { id: 3, name: "Maria", progress: 28, avatar: "👩‍🦱" },
    { id: 4, name: "Juan", progress: 32.5, avatar: "👨" },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Healthy Quest</h1>
          <p className="text-muted-foreground">¡Bienvenido de vuelta!</p>
        </div>
        <div className="bg-emerald-100 dark:bg-emerald-900 px-3 py-1 rounded-full">
          <span className="text-emerald-700 dark:text-emerald-300 font-semibold text-sm">{userPoints} Puntos</span>
        </div>
      </div>

      {/* Team Goal Card */}
      <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="text-primary" size={20} />
              <CardTitle className="text-lg">Meta de Equipo: Caminata 50km</CardTitle>
            </div>
            <span className="text-sm font-bold text-primary">
              {teamCurrentDistance}km / {teamGoalDistance}km
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Progress Bar */}
          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-500"
              style={{ width: `${(teamCurrentDistance / teamGoalDistance) * 100}%` }}
            />
          </div>

          {/* Friend Avatars on Progress Line */}
          <div className="relative h-12 flex items-center">
            {friendAvatars.map((friend) => {
              const position = (friend.progress / teamGoalDistance) * 100
              return (
                <div
                  key={friend.id}
                  className="absolute flex flex-col items-center gap-1 transform -translate-x-1/2"
                  style={{ left: `${position}%` }}
                >
                  <div className="text-2xl">{friend.avatar}</div>
                  <div className="text-xs font-semibold text-foreground bg-card px-2 py-0.5 rounded whitespace-nowrap border border-border">
                    {friend.name}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Water Intake Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="text-blue-500" size={20} />
              <CardTitle className="text-lg">Agua</CardTitle>
            </div>
            <span className="text-sm font-bold text-foreground">
              {waterIntake} / {waterGoal} Vasos
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {Array.from({ length: waterGoal }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-12 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  i < waterIntake ? "bg-blue-100 dark:bg-blue-900 border-blue-500" : "bg-muted border-border"
                }`}
              >
                {i < waterIntake && <Droplets className="text-blue-500" size={20} />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Flame className="text-orange-500" size={20} />
            <CardTitle className="text-lg">Actividad Hoy</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Calorías</p>
              <p className="text-2xl font-bold">545</p>
              <p className="text-xs text-muted-foreground">de 2000 kcal</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Pasos</p>
              <p className="text-2xl font-bold">8,243</p>
              <p className="text-xs text-muted-foreground">de 10000</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
