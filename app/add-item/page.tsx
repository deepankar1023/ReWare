"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Package, ArrowLeft, Camera, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const categories = ["Tops", "Bottoms", "Dresses", "Outerwear", "Footwear", "Accessories"]

const conditions = [
  { value: "like-new", label: "Like New", points: 50 },
  { value: "excellent", label: "Excellent", points: 40 },
  { value: "good", label: "Good", points: 30 },
  { value: "fair", label: "Fair", points: 20 },
]

const sizes = {
  Tops: ["XS", "S", "M", "L", "XL", "XXL"],
  Bottoms: ["24", "26", "28", "30", "32", "34", "36", "38"],
  Dresses: ["XS", "S", "M", "L", "XL", "XXL"],
  Outerwear: ["XS", "S", "M", "L", "XL", "XXL"],
  Footwear: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
  Accessories: ["One Size"],
}

export default function AddItemPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
    brand: "",
    color: "",
    tags: "",
    swapPreferences: "",
  })
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [agreeToGuidelines, setAgreeToGuidelines] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you'd upload to a service like Vercel Blob
      // For demo, we'll use placeholder URLs
      const newImages = Array.from(files).map(
        (_, index) => `/placeholder.svg?height=200&width=200&text=Image${images.length + index + 1}`,
      )
      setImages((prev) => [...prev, ...newImages].slice(0, 5)) // Max 5 images
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeToGuidelines) {
      alert("Please agree to the community guidelines")
      return
    }
    if (images.length === 0) {
      alert("Please upload at least one image")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Item submitted for review!")
      router.push("/dashboard")
    }, 2000)
  }

  const selectedCondition = conditions.find((c) => c.value === formData.condition)
  const estimatedPoints = selectedCondition ? selectedCondition.points : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">ReWear</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Item</h1>
          <p className="text-gray-600">List your unused clothing for swapping or points redemption</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
              <CardDescription>Upload up to 5 high-quality photos of your item</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {images.length < 5 && (
                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                    <Camera className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Add Photo</span>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-500">
                First photo will be used as the main image. {5 - images.length} photos remaining.
              </p>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Provide essential details about your item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Item Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Vintage Denim Jacket"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the item's condition, style, fit, and any other relevant details..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type">Item Type</Label>
                  <Input
                    id="type"
                    placeholder="e.g., Jacket, Shirt, Sneakers"
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="size">Size *</Label>
                  <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.category &&
                        sizes[formData.category as keyof typeof sizes]?.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="condition">Condition *</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition.value} value={condition.value}>
                          {condition.label} ({condition.points} pts)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    placeholder="e.g., Nike, Zara, H&M"
                    value={formData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="color">Primary Color</Label>
                  <Input
                    id="color"
                    placeholder="e.g., Blue, Black, Red"
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
              <CardDescription>Help others find your item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="e.g., vintage, casual, summer, designer (separate with commas)"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">Add relevant tags to help others discover your item</p>
              </div>

              <div>
                <Label htmlFor="swapPreferences">Swap Preferences</Label>
                <Textarea
                  id="swapPreferences"
                  placeholder="What types of items are you looking for in exchange? (optional)"
                  value={formData.swapPreferences}
                  onChange={(e) => handleInputChange("swapPreferences", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Points Estimation */}
          {estimatedPoints > 0 && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="bg-green-600 text-white rounded-full p-2">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">Estimated Points Value</h3>
                    <p className="text-green-700">
                      Your item will be worth approximately{" "}
                      <Badge className="bg-green-600">{estimatedPoints} points</Badge> based on its condition
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Guidelines Agreement */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="guidelines"
                  checked={agreeToGuidelines}
                  onCheckedChange={(checked) => setAgreeToGuidelines(checked as boolean)}
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="guidelines"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the community guidelines
                  </Label>
                  <p className="text-sm text-gray-600">
                    By listing this item, you confirm it's in the described condition and agree to our{" "}
                    <Link href="/guidelines" className="text-green-600 hover:underline">
                      community guidelines
                    </Link>
                    . Items are subject to admin review.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button type="button" variant="outline" className="w-full bg-transparent">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit for Review"}
            </Button>
          </div>
        </form>

        {/* Info Box */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Review Process</h4>
                <p className="text-sm text-blue-700">
                  All items are reviewed by our admin team within 24 hours. You'll receive an email notification once
                  your item is approved and live on the platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
