"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Star, Heart, Share2, Package, ArrowUpDown, MessageCircle, Shield, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data - in real app this would come from API based on ID
const itemData = {
  id: 1,
  title: "Vintage Denim Jacket",
  description:
    "Beautiful vintage denim jacket in excellent condition. This classic piece features authentic distressing and a perfect fit. Originally from a high-end boutique, it's been well-maintained and is ready for a new home. Perfect for layering or as a statement piece.",
  category: "Outerwear",
  type: "Jacket",
  condition: "Good",
  size: "M",
  brand: "Levi's",
  color: "Blue",
  points: 25,
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
  tags: ["vintage", "denim", "casual", "classic"],
  user: {
    name: "Sarah M.",
    avatar: "/placeholder-user.jpg",
    rating: 4.8,
    totalSwaps: 23,
    joinDate: "March 2024",
    location: "New York, NY",
  },
  availability: "Available",
  postedDate: "2024-01-10",
  views: 45,
  likes: 12,
}

export default function ItemDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [swapMessage, setSwapMessage] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  const handleSwapRequest = () => {
    // Handle swap request logic
    alert("Swap request sent!")
  }

  const handlePointsRedeem = () => {
    // Handle points redemption logic
    alert("Item redeemed with points!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/browse">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Browse
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">ReWear</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={itemData.images[selectedImage] || "/placeholder.svg"}
                alt={itemData.title}
                width={500}
                height={500}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/80 hover:bg-white"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {itemData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-green-600" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${itemData.title} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{itemData.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{itemData.views} views</span>
                    <span>{itemData.likes} likes</span>
                    <span>Posted {itemData.postedDate}</span>
                  </div>
                </div>
                <Badge className="bg-green-600 text-lg px-3 py-1">{itemData.points} points</Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {itemData.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">{itemData.description}</p>
            </div>

            {/* Item Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Item Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Category</Label>
                  <p className="font-medium">{itemData.category}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Type</Label>
                  <p className="font-medium">{itemData.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Size</Label>
                  <p className="font-medium">{itemData.size}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Condition</Label>
                  <Badge variant="outline">{itemData.condition}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Brand</Label>
                  <p className="font-medium">{itemData.brand}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Color</Label>
                  <p className="font-medium">{itemData.color}</p>
                </div>
              </CardContent>
            </Card>

            {/* Owner Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Item Owner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={itemData.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{itemData.user.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{itemData.user.rating}</span>
                      </div>
                      <span>{itemData.user.totalSwaps} swaps</span>
                      <span>{itemData.user.location}</span>
                    </div>
                    <p className="text-sm text-gray-500">Member since {itemData.user.joinDate}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={handleSwapRequest}
                  disabled={itemData.availability !== "Available"}
                >
                  <ArrowUpDown className="h-5 w-5 mr-2" />
                  Request Swap
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  size="lg"
                  onClick={handlePointsRedeem}
                  disabled={itemData.availability !== "Available"}
                >
                  Redeem with Points
                </Button>
              </div>

              {itemData.availability !== "Available" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">
                      This item is currently {itemData.availability.toLowerCase()}
                    </span>
                  </div>
                </div>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Send Swap Message</CardTitle>
                  <CardDescription>Include details about what you'd like to swap or any questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Hi! I'm interested in swapping this item. I have a..."
                    value={swapMessage}
                    onChange={(e) => setSwapMessage(e.target.value)}
                    rows={4}
                  />
                  <Button className="w-full">Send Message</Button>
                </CardContent>
              </Card>
            </div>

            {/* Trust & Safety */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Safe Swapping</h4>
                  <p className="text-sm text-blue-700">
                    All swaps are protected by our community guidelines. Report any issues to our support team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Items */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Items</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Similar item"
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600">30 pts</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Similar Denim Jacket</h3>
                    <p className="text-sm text-gray-600 mb-2">Outerwear • Size L</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Excellent</Badge>
                      <Link href="/item/2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
