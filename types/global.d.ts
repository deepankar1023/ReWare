export interface User {
  _id: string
  name: string
  email: string
  role: "user" | "admin"
  points: number
  avatar?: string
  bio?: string
  location?: string
  joinedAt: string
  isActive: boolean
  rating: number
  totalSwaps: number
}

export interface Category {
  _id: string
  name: string
  description: string
  icon: string
  isActive: boolean
}

export interface Item {
  _id: string
  title: string
  description: string
  category: string
  type: string
  size: string
  condition: "new" | "like-new" | "good" | "fair" | "poor"
  brand?: string
  color?: string
  images: string[]
  tags: string[]
  owner: User
  pointsValue: number
  status: "pending" | "approved" | "rejected" | "swapped" | "removed"
  isAvailable: boolean
  swapPreferences: string[]
  createdAt: string
  updatedAt: string
  approvedAt?: string
  approvedBy?: string
  rejectionReason?: string
  views: number
  favorites: number
}

export interface Swap {
  _id: string
  requester: User
  owner: User
  requestedItem: Item
  offeredItem?: Item
  pointsOffered?: number
  type: "item-swap" | "points-redemption"
  status: "pending" | "accepted" | "rejected" | "completed" | "cancelled"
  message?: string
  createdAt: string
  updatedAt: string
  completedAt?: string
}

export interface PointsTransaction {
  _id: string
  user: string
  type: "earned" | "spent" | "bonus" | "penalty"
  amount: number
  description: string
  relatedItem?: string
  relatedSwap?: string
  createdAt: string
}
