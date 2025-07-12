import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Swap from "@/models/Swap"
import User from "@/models/User"
import Item from "@/models/Item"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const userPayload = await getUserFromRequest(request)
    if (!userPayload) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // 'sent' or 'received'

    const query: any = {}

    if (type === "sent") {
      query.requester = userPayload.userId
    } else if (type === "received") {
      query.owner = userPayload.userId
    } else {
      query.$or = [{ requester: userPayload.userId }, { owner: userPayload.userId }]
    }

    const swaps = await Swap.find(query)
      .populate("requester", "name avatar")
      .populate("owner", "name avatar")
      .populate("requestedItem", "title images pointsValue")
      .populate("offeredItem", "title images pointsValue")
      .sort({ createdAt: -1 })

    return NextResponse.json({ swaps })
  } catch (error) {
    console.error("Get swaps error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const userPayload = await getUserFromRequest(request)
    if (!userPayload) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { requestedItemId, offeredItemId, pointsOffered, type, message } = await request.json()

    // Validate input
    if (!requestedItemId || !type) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 })
    }

    // Get the requested item
    const requestedItem = await Item.findById(requestedItemId)
    if (!requestedItem) {
      return NextResponse.json({ error: "Requested item not found" }, { status: 404 })
    }

    // Check if user is trying to swap with themselves
    if (requestedItem.owner.toString() === userPayload.userId) {
      return NextResponse.json({ error: "Cannot swap with yourself" }, { status: 400 })
    }

    // Validate swap type
    if (type === "item-swap" && !offeredItemId) {
      return NextResponse.json({ error: "Offered item required for item swap" }, { status: 400 })
    }

    if (type === "points-redemption" && !pointsOffered) {
      return NextResponse.json({ error: "Points amount required for points redemption" }, { status: 400 })
    }

    // For points redemption, check if user has enough points
    if (type === "points-redemption") {
      const user = await User.findById(userPayload.userId)
      if (!user || user.points < pointsOffered) {
        return NextResponse.json({ error: "Insufficient points" }, { status: 400 })
      }
    }

    // Create swap
    const swap = await Swap.create({
      requester: userPayload.userId,
      owner: requestedItem.owner,
      requestedItem: requestedItemId,
      offeredItem: offeredItemId,
      pointsOffered,
      type,
      message,
    })

    const populatedSwap = await Swap.findById(swap._id)
      .populate("requester", "name avatar")
      .populate("owner", "name avatar")
      .populate("requestedItem", "title images pointsValue")
      .populate("offeredItem", "title images pointsValue")

    return NextResponse.json({ swap: populatedSwap }, { status: 201 })
  } catch (error) {
    console.error("Create swap error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
