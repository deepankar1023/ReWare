import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import Item from "@/models/Item"
import Swap from "@/models/Swap"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const userPayload = await getUserFromRequest(request)
    if (!userPayload || userPayload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [totalUsers, totalItems, pendingItems, approvedItems, totalSwaps, completedSwaps] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Item.countDocuments(),
      Item.countDocuments({ status: "pending" }),
      Item.countDocuments({ status: "approved" }),
      Swap.countDocuments(),
      Swap.countDocuments({ status: "completed" }),
    ])

    const stats = {
      totalUsers,
      totalItems,
      pendingItems,
      approvedItems,
      totalSwaps,
      completedSwaps,
      activeUsers: totalUsers, // Simplified for now
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Get admin stats error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
