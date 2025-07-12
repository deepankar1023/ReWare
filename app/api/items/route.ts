import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Item from "@/models/Item"
import { getUserFromRequest } from "@/lib/auth"
import { calculatePointsValue } from "@/lib/utils/points"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const category = searchParams.get("category")
    const condition = searchParams.get("condition")
    const search = searchParams.get("search")
    const status = searchParams.get("status") || "approved"

    const skip = (page - 1) * limit

    // Build query
    const query: any = { status }

    if (category) {
      query.category = category
    }

    if (condition) {
      query.condition = condition
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
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { title, description, category, type, size, condition, brand, color, images, tags, swapPreferences } =
      await request.json()

    // Validate required fields
    if (!title || !description || !category || !type || !size || !condition) {
      return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 })
    }

    // Calculate points value based on condition
    const pointsValue = calculatePointsValue(condition)

    const item = await Item.create({
      title,
      description,
      category,
      type,
      size,
      condition,
      brand,
      color,
      images: images || [],
      tags: tags || [],
      swapPreferences: swapPreferences || [],
      owner: userPayload.userId,
      pointsValue,
    })

    const populatedItem = await Item.findById(item._id).populate("owner", "name avatar rating")

    return NextResponse.json({ item: populatedItem }, { status: 201 })
  } catch (error) {
    console.error("Create item error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
