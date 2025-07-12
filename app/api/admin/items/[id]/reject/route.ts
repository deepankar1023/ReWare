import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Item from "@/models/Item"
import { getUserFromRequest } from "@/lib/auth"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const userPayload = await getUserFromRequest(request)
    if (!userPayload || userPayload.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { reason } = await request.json()

    const item = await Item.findById(params.id)
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // Update item status
    item.status = "rejected"
    item.rejectionReason = reason
    await item.save()

    return NextResponse.json({ message: "Item rejected successfully", item })
  } catch (error) {
    console.error("Reject item error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
