import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Item from "@/models/Item"
import User from "@/models/User"
import PointsTransaction from "@/models/PointsTransaction"
import { getUserFromRequest } from "@/lib/auth"
import { calculateItemPoints } from "@/lib/utils/points"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const category = searchParams.get("category")
    const condition = searchParams.get("condition")
    const size = searchParams.get("size")
    const search = searchParams.get("search")
    const status = searchParams.get("status") || "approved"

    const skip = (page - 1) * limit

    // Build query
    const query: any = { status }

    if (category && category !== "all") {
      query.category = category
    }

    if (condition && condition !== "all") {
      query.condition = condition
    }

    if (size && size !== "all") {
      query.size = size
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    const items = await Item.find(query)
      .populate("owner", "name avatar rating")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Item.countDocuments(query)

    return NextResponse.json({
      items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get items error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const userPayload = await getUserFromRequest(request)
    if (!userPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const itemData = await request.json()

    // Calculate points value based on condition
    const pointsValue = calculateItemPoints(itemData.condition)

    const item = await Item.create({
      ...itemData,
      owner: userPayload.userId,
      pointsValue,
    })

    // Award points to user for listing item
    await User.findByIdAndUpdate(userPayload.userId, { $inc: { points: 10 } })

    // Create points transaction
    await PointsTransaction.create({
      user: userPayload.userId,
      type: "earned",
      amount: 10,
      description: "Item listed",
      relatedItem: item._id,
    })

    const populatedItem = await Item.findById(item._id).populate("owner", "name avatar rating")

    return NextResponse.json({ item: populatedItem })
  } catch (error) {
    console.error("Create item error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
