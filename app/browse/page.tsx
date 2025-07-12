"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Star, Heart, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const items = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    condition: "Good",
    size: "M",
    points: 25,
    image: "/placeholder.svg?height=200&width=200",
    user: "Sarah M.",
    rating: 4.8,
    location: "New York",
    tags: ["vintage", "denim", "casual"],
  },
  {
    id: 2,
    title: "Designer Silk Blouse",
    category: "Tops",
    condition: "Excellent",
    size: "S",
    points: 35,
    image: "/placeholder.svg?height=200&width=200",
    user: "Emma K.",
    rating: 4.9,
    location: "Los Angeles",
    tags: ["designer", "silk", "formal"],
  },
  {
    id: 3,
    title: "Athletic Running Shoes",
    category: "Footwear",
    condition: "Like New",
    size: "9",
    points: 40,
    image: "/placeholder.svg?height=200&width=200",
    user: "Mike R.",
    rating: 4.7,
    location: "Chicago",
    tags: ["athletic", "running", "nike"],
  },
  {
    id: 4,
    title: "Wool Winter Coat",
    category: "Outerwear",
    condition: "Good",
    size: "L",
    points: 50,
    image: "/placeholder.svg?height=200&width=200",
    user: "Lisa T.",
    rating: 4.6,
    location: "Boston",
    tags: ["wool", "winter", "warm"],
  },
  {
    id: 5,
    title: "Summer Floral Dress",
    category: "Dresses",
    condition: "Excellent",
    size: "M",
    points: 30,
    image: "/placeholder.svg?height=200&width=200",
    user: "Anna P.",
    rating: 4.8,
    location: "Miami",
    tags: ["summer", "floral", "casual"],
  },
  {
    id: 6,
    title: "Leather Handbag",
    category: "Accessories",
    condition: "Good",
    size: "One Size",
    points: 45,
    image: "/placeholder.svg?height=200&width=200",
    user: "Rachel S.",
    rating: 4.9,
    location: "Seattle",
    tags: ["leather", "handbag", "designer"],
  },
]

const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Footwear", "Accessories"]
const conditions = ["All", "Like New", "Excellent", "Good", "Fair"]
const sizes = ["All", "XS", "S", "M", "L", "XL", "XXL"]

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCondition, setSelectedCondition] = useState("All")
  const [selectedSize, setSelectedSize] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesCondition = selectedCondition === "All" || item.condition === selectedCondition
    const matchesSize = selectedSize === "All" || item.size === selectedSize

    return matchesSearch && matchesCategory && matchesCondition && matchesSize
  })

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
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/add-item">
              <Button>Add Item</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Items</h1>
          <p className="text-gray-600">Discover amazing clothing items from our community</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search items, brands, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="points-low">Points: Low to High</SelectItem>
                  <SelectItem value="points-high">Points: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredItems.length} of {items.length} items
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge className="bg-green-600">{item.points} pts</Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="absolute top-2 left-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.category} • Size {item.size}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{item.condition}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{item.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.user}</p>
                      <p className="text-xs text-gray-500">{item.location}</p>
                    </div>
                    <Link href={`/item/${item.id}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
                setSelectedCondition("All")
                setSelectedSize("All")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
