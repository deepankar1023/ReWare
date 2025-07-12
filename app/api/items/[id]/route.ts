import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Item from "@/models/Item"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const item = await Item.findById(params.id).populate("owner", "name avatar rating location joinedAt totalSwaps")

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // Increment view count
    await Item.findByIdAndUpdate(params.id, { $inc: { views: 1 } })

    return NextResponse.json({ item })
  } catch (error) {
    console.error("Get item error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
