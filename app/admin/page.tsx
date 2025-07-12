"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, X, Eye, Search, Filter, AlertTriangle, Users, Package, Flag, Shield } from "lucide-react"
import Image from "next/image"

const pendingItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    condition: "Good",
    user: "Sarah Johnson",
    userEmail: "sarah@example.com",
    submittedDate: "2024-01-15",
    images: ["/placeholder.svg?height=200&width=200"],
    description: "Beautiful vintage denim jacket in excellent condition...",
    points: 25,
    status: "pending",
  },
  {
    id: 2,
    title: "Designer Silk Blouse",
    category: "Tops",
    condition: "Excellent",
    user: "Emma Wilson",
    userEmail: "emma@example.com",
    submittedDate: "2024-01-14",
    images: ["/placeholder.svg?height=200&width=200"],
    description: "Luxury silk blouse from premium brand...",
    points: 35,
    status: "pending",
  },
  {
    id: 3,
    title: "Suspicious Item",
    category: "Accessories",
    condition: "Like New",
    user: "Fake User",
    userEmail: "fake@example.com",
    submittedDate: "2024-01-13",
    images: ["/placeholder.svg?height=200&width=200"],
    description: "This looks like a counterfeit item...",
    points: 50,
    status: "flagged",
  },
]

const reportedItems = [
  {
    id: 4,
    title: "Inappropriate Content",
    category: "Tops",
    user: "Problem User",
    reportReason: "Inappropriate images",
    reportedBy: "Community Member",
    reportDate: "2024-01-12",
    status: "under_review",
  },
]

const adminStats = {
  totalUsers: 10247,
  activeItems: 5632,
  pendingReviews: 23,
  reportedItems: 5,
  approvedToday: 45,
  rejectedToday: 3,
}

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")

  const handleApprove = (itemId: number) => {
    alert(`Item ${itemId} approved!`)
    // In real app, make API call to approve item
  }

  const handleReject = (itemId: number) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason")
      return
    }
    alert(`Item ${itemId} rejected: ${rejectionReason}`)
    setRejectionReason("")
    // In real app, make API call to reject item
  }

  const handleRemoveItem = (itemId: number) => {
    if (confirm("Are you sure you want to remove this item?")) {
      alert(`Item ${itemId} removed!`)
      // In real app, make API call to remove item
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold">ReWear Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              Admin Panel
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Moderate content and manage the ReWear community</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Items</CardTitle>
              <Package className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.activeItems.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.pendingReviews}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reported Items</CardTitle>
              <Flag className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.reportedItems}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
              <Check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.approvedToday}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected Today</CardTitle>
              <X className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.rejectedToday}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending Items ({adminStats.pendingReviews})</TabsTrigger>
            <TabsTrigger value="reported">Reported Items ({adminStats.reportedItems})</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search pending items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pending Items List */}
            <div className="space-y-4">
              {pendingItems.map((item) => (
                <Card key={item.id} className={item.status === "flagged" ? "border-red-200 bg-red-50" : ""}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <Image
                        src={item.images[0] || "/placeholder.svg"}
                        alt={item.title}
                        width={120}
                        height={120}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              {item.title}
                              {item.status === "flagged" && (
                                <Badge variant="destructive">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Flagged
                                </Badge>
                              )}
                            </h3>
                            <p className="text-gray-600">
                              {item.category} • {item.condition}
                            </p>
                            <p className="text-sm text-gray-500">
                              Submitted by {item.user} ({item.userEmail}) on {item.submittedDate}
                            </p>
                          </div>
                          <Badge className="bg-green-600">{item.points} pts</Badge>
                        </div>

                        <p className="text-gray-700 line-clamp-2">{item.description}</p>

                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(item.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleReject(item.id)}>
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Rejection Reason Input */}
                    <div className="mt-4 pt-4 border-t">
                      <Textarea
                        placeholder="Rejection reason (required for rejection)..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reported" className="space-y-6">
            <div className="space-y-4">
              {reportedItems.map((item) => (
                <Card key={item.id} className="border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          {item.title}
                          <Badge variant="destructive">Reported</Badge>
                        </h3>
                        <p className="text-gray-600">{item.category}</p>
                        <p className="text-sm text-gray-600">
                          <strong>Reported by:</strong> {item.reportedBy} on {item.reportDate}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Reason:</strong> {item.reportReason}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Item owner:</strong> {item.user}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleRemoveItem(item.id)}>
                          Remove Item
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
                  <p className="text-gray-600">
                    User management features would be implemented here, including user search, account suspension, and
                    permission management.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
