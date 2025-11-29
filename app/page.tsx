"use client"

import { useState } from "react"
import BottomNavigation from "@/components/bottom-navigation"
import HomeScreen from "@/components/screens/home-screen"
import CommunityScreen from "@/components/screens/community-screen"
import ProfileScreen from "@/components/screens/profile-screen"

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")
  const [userPoints, setUserPoints] = useState(450)
  const [userAvatar, setUserAvatar] = useState({
    base: "blue-avatar",
    accessories: ["sunglasses"],
    background: "gradient-bg-1",
  })

  const handleBuyItem = (itemCost: number) => {
    if (userPoints >= itemCost) {
      setUserPoints(userPoints - itemCost)
      return true
    }
    return false
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === "home" && <HomeScreen userPoints={userPoints} />}
        {activeTab === "community" && <CommunityScreen onEarnPoints={setUserPoints} currentPoints={userPoints} />}
        {activeTab === "profile" && (
          <ProfileScreen
            userPoints={userPoints}
            userAvatar={userAvatar}
            onBuyItem={handleBuyItem}
            onUpdateAvatar={setUserAvatar}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
