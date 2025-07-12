"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Package, ArrowUpDown, Plus, Star, Clock, CheckCircle, XCircle, Eye, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const userStats = {
  name: "Sarah Johnson",
  email: "sarah@example.com",
  points: 125,
  totalSwaps: 23,
  successfulSwaps: 21,
  rating: 4.8,
  joinDate: "March 2024",
}

const userItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    condition: "Good",
    points: 25,
    status: "Available",
    views: 45,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    title: "Designer Silk Blouse",
    category: "Tops",
    condition: "Excellent",
    points: 35,
    status: "Pending Swap",
    views: 32,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    title: "Summer Dress",
    category: "Dresses",
    condition: "Like New",
    points: 30,
    status: "Swapped",
    views: 67,
    image: "/placeholder.svg?height=100&width=100",
  },
]

const swapHistory = [
  {
    id: 1,
    type: "outgoing",
    item: "Vintage Denim Jacket",
    partner: "Emma Wilson",
    status: "pending",
    date: "2024-01-15",
    partnerItem: "Wool Sweater",
  },
  {
    id: 2,
    type: "incoming",
    item: "Designer Handbag",
    partner: "Mike Chen",
    status: "completed",
    date: "2024-01-10",
    partnerItem: "Leather Boots",
  },
  {
    id: 3,
    type: "outgoing",
    item: "Summer Dress",
    partner: "Lisa Park",
    status: "completed",
    date: "2024-01-05",
    partnerItem: "Casual Blazer",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Package className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">ReWear</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/browse">
              <Button variant="ghost">Browse</Button>
            </Link>
            <Link href="/add-item">
              <Button>Add Item</Button>
            </Link>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your items, swaps, and profile</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="items">My Items</TabsTrigger>
            <TabsTrigger value="swaps">Swaps</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Points Balance</CardTitle>
                  <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.points}</div>
                  <p className="text-xs text-muted-foreground">Available for redemption</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Swaps</CardTitle>
                  <ArrowUpDown className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.totalSwaps}</div>
                  <p className="text-xs text-muted-foreground">Lifetime exchanges</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round((userStats.successfulSwaps / userStats.totalSwaps) * 100)}%
                  </div>
                  <p className="text-xs text-muted-foreground">Successful swaps</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.rating}</div>
                  <p className="text-xs text-muted-foreground">Community rating</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Items</CardTitle>
                  <CardDescription>Your latest listed items</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={50}
                        height={50}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.category}</p>
                      </div>
                      <Badge variant={item.status === "Available" ? "default" : "secondary"}>{item.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Swaps</CardTitle>
                  <CardDescription>Your latest swap activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {swapHistory.slice(0, 3).map((swap) => (
                    <div key={swap.id} className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          swap.status === "completed" ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{swap.item}</p>
                        <p className="text-sm text-gray-600">with {swap.partner}</p>
                      </div>
                      <Badge variant={swap.status === "completed" ? "default" : "secondary"}>{swap.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="items" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Items</h2>
              <Link href="/add-item">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Button>
              </Link>
            </div>

            <div className="grid gap-6">
              {userItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-gray-600">
                          {item.category} • {item.condition}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge>{item.points} points</Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Eye className="h-4 w-4" />
                            {item.views} views
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            item.status === "Available"
                              ? "default"
                              : item.status === "Pending Swap"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {item.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="swaps" className="space-y-6">
            <h2 className="text-2xl font-bold">Swap History</h2>

            <div className="space-y-4">
              {swapHistory.map((swap) => (
                <Card key={swap.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-full ${swap.type === "outgoing" ? "bg-blue-100" : "bg-green-100"}`}
                        >
                          <ArrowUpDown
                            className={`h-4 w-4 ${swap.type === "outgoing" ? "text-blue-600" : "text-green-600"}`}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {swap.type === "outgoing" ? "Sent" : "Received"}: {swap.item}
                          </h3>
                          <p className="text-gray-600">
                            {swap.type === "outgoing" ? "To" : "From"} {swap.partner} • {swap.partnerItem}
                          </p>
                          <p className="text-sm text-gray-500">{swap.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {swap.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : swap.status === "pending" ? (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <Badge
                          variant={
                            swap.status === "completed"
                              ? "default"
                              : swap.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {swap.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="text-lg">SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{userStats.name}</h3>
                    <p className="text-gray-600">{userStats.email}</p>
                    <p className="text-sm text-gray-500">Member since {userStats.joinDate}</p>
                  </div>
                  <Button variant="outline" className="ml-auto bg-transparent">
                    Edit Profile
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Account Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Points Earned:</span>
                        <span className="font-medium">245</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Points Spent:</span>
                        <span className="font-medium">120</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Items Listed:</span>
                        <span className="font-medium">15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Successful Swaps:</span>
                        <span className="font-medium">{userStats.successfulSwaps}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Preferences</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Email Notifications:</span>
                        <Badge variant="outline">Enabled</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Profile Visibility:</span>
                        <Badge variant="outline">Public</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Auto-approve Swaps:</span>
                        <Badge variant="outline">Disabled</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
