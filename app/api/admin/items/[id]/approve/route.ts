import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Item from "@/models/Item"
import User from "@/models/User"
import PointsTransaction from "@/models/PointsTransaction"
import { getUserFromRequest } from "@/lib/auth"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const userPayload = await getUserFromRequest(request)
    if (!userPayload || userPayload.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const item = await Item.findById(params.id)
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // Update item status
    item.status = "approved"
    item.approvedAt = new Date()
    item.approvedBy = userPayload.userId
    await item.save()

    // Award points to the item owner
    await User.findByIdAndUpdate(item.owner, {
      $inc: { points: 10 }, // Bonus points for listing an item
    })

    // Create points transaction
    await PointsTransaction.create({
      user: item.owner,
      type: "earned",
      amount: 10,
      description: "Item listing approved",
      relatedItem: item._id,
    })

    return NextResponse.json({ message: "Item approved successfully", item })
  } catch (error) {
    console.error("Approve item error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
