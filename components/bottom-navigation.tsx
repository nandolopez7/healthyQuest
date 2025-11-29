"use client"

import { Home, Users, User } from "lucide-react"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home", label: "Diario", icon: Home },
    { id: "community", label: "Comunidad", icon: Users },
    { id: "profile", label: "Perfil", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around items-center h-20 shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all ${
              isActive ? "text-primary bg-primary/10 scale-110" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={24} />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
