"use client"

import { useState } from "react"
import { ShoppingBag, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AvatarItem {
  id: string
  name: string
  type: "clothes" | "accessories" | "background"
  price: number
  emoji: string
  owned: boolean
}

interface UserAvatar {
  base: string
  accessories: string[]
  background: string
}

interface ProfileScreenProps {
  userPoints: number
  userAvatar: UserAvatar
  onBuyItem: (price: number) => boolean
  onUpdateAvatar: (avatar: UserAvatar) => void
}

export default function ProfileScreen({ userPoints, userAvatar, onBuyItem, onUpdateAvatar }: ProfileScreenProps) {
  const [items] = useState<AvatarItem[]>([
    // Clothes
    { id: "shirt-blue", name: "Camiseta Azul", type: "clothes", price: 150, emoji: "👕", owned: true },
    { id: "shirt-red", name: "Camiseta Roja", type: "clothes", price: 150, emoji: "🔴", owned: false },
    { id: "jacket", name: "Chaqueta Deportiva", type: "clothes", price: 300, emoji: "🧥", owned: false },
    // Accessories
    { id: "sunglasses", name: "Gafas de Sol", type: "accessories", price: 200, emoji: "😎", owned: false },
    { id: "hat", name: "Gorro", type: "accessories", price: 180, emoji: "🧢", owned: false },
    { id: "headphones", name: "Audífonos", type: "accessories", price: 250, emoji: "🎧", owned: false },
    // Backgrounds
    { id: "bg-beach", name: "Playa", type: "background", price: 100, emoji: "🏖️", owned: false },
    { id: "bg-forest", name: "Bosque", type: "background", price: 100, emoji: "🌲", owned: false },
    { id: "bg-mountain", name: "Montaña", type: "background", price: 120, emoji: "⛰️", owned: false },
  ])

  const [selectedItem, setSelectedItem] = useState<AvatarItem | null>(null)
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)

  const handleBuyItem = (item: AvatarItem) => {
    if (onBuyItem(item.price)) {
      setPurchaseSuccess(true)
      setTimeout(() => setPurchaseSuccess(false), 2000)

      // Update avatar based on item type
      if (item.type === "accessories") {
        onUpdateAvatar({
          ...userAvatar,
          accessories: [...userAvatar.accessories, item.id],
        })
      }
    }
  }

  const renderItemsGrid = (type: "clothes" | "accessories" | "background") => {
    const filteredItems = items.filter((item) => item.type === type)

    return (
      <div className="grid grid-cols-3 gap-3">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedItem?.id === item.id
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="text-4xl mb-2">{item.emoji}</div>
            <p className="text-xs font-semibold text-foreground text-center line-clamp-2">{item.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.price} Pts</p>
            {item.owned && (
              <div className="mt-2 flex justify-center">
                <Check className="text-emerald-500" size={16} />
              </div>
            )}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Purchase Success Message */}
      {purchaseSuccess && (
        <div className="fixed top-4 left-4 right-4 bg-emerald-100 dark:bg-emerald-900 border border-emerald-500 rounded-lg p-4 text-emerald-700 dark:text-emerald-300 font-semibold z-50">
          ¡Compra exitosa! Artículo añadido a tu avatar.
        </div>
      )}

      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-9xl">{userAvatar.accessories.includes("sunglasses") ? "😎" : "😊"}</div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Mi Perfil</h1>
          <div className="mt-2 flex items-center justify-center gap-2 bg-emerald-100 dark:bg-emerald-900 px-4 py-2 rounded-full">
            <ShoppingBag className="text-emerald-700 dark:text-emerald-300" size={20} />
            <span className="font-bold text-emerald-700 dark:text-emerald-300">{userPoints} Puntos</span>
          </div>
        </div>
      </div>

      {/* Items Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Tienda de Avatar</CardTitle>
          <CardDescription>Personaliza tu avatar con ítems especiales</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="accessories" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="clothes">Ropa</TabsTrigger>
              <TabsTrigger value="accessories">Accesorios</TabsTrigger>
              <TabsTrigger value="background">Fondos</TabsTrigger>
            </TabsList>

            <TabsContent value="clothes" className="mt-4">
              {renderItemsGrid("clothes")}
            </TabsContent>

            <TabsContent value="accessories" className="mt-4">
              {renderItemsGrid("accessories")}
            </TabsContent>

            <TabsContent value="background" className="mt-4">
              {renderItemsGrid("background")}
            </TabsContent>
          </Tabs>

          {/* Item Details and Purchase */}
          {selectedItem && (
            <Card className="bg-muted/50 border-primary/50">
              <CardContent className="pt-6 space-y-4">
                <div className="text-center">
                  <div className="text-6xl mb-3">{selectedItem.emoji}</div>
                  <h3 className="text-xl font-bold text-foreground">{selectedItem.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize mt-1">{selectedItem.type}</p>
                </div>

                {selectedItem.owned ? (
                  <Button disabled className="w-full">
                    <Check className="mr-2" size={18} />
                    Ya Posees Este Ítem
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleBuyItem(selectedItem)}
                    disabled={userPoints < selectedItem.price}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <ShoppingBag className="mr-2" size={18} />
                    Comprar por {selectedItem.price} Puntos
                  </Button>
                )}

                {userPoints < selectedItem.price && !selectedItem.owned && (
                  <p className="text-sm text-destructive text-center">
                    Te faltan {selectedItem.price - userPoints} puntos
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Achievement Section */}
      <Card>
        <CardHeader>
          <CardTitle>Logros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-2xl">🏃</p>
              <p className="text-xs font-semibold mt-2">10km</p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-2xl">💧</p>
              <p className="text-xs font-semibold mt-2">Hidratado</p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-2xl">👥</p>
              <p className="text-xs font-semibold mt-2">Social</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
