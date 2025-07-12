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
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    // Get basic stats
    const totalUsers = await User.countDocuments()
    const totalItems = await Item.countDocuments()
    const pendingItems = await Item.countDocuments({ status: "pending" })
    const approvedItems = await Item.countDocuments({ status: "approved" })
    const totalSwaps = await Swap.countDocuments()
    const completedSwaps = await Swap.countDocuments({ status: "completed" })

    // Get recent activity
    const recentItems = await Item.find().populate("owner", "name").sort({ createdAt: -1 }).limit(5)

    const recentSwaps = await Swap.find()
      .populate("requester", "name")
      .populate("owner", "name")
      .populate("requestedItem", "title")
      .sort({ createdAt: -1 })
      .limit(5)

    return NextResponse.json({
      stats: {
        totalUsers,
        totalItems,
        pendingItems,
        approvedItems,
        totalSwaps,
        completedSwaps,
      },
      recentActivity: {
        items: recentItems,
        swaps: recentSwaps,
      },
    })
  } catch (error) {
    console.error("Get admin stats error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
