import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Item from "@/models/Item"
import { getUserFromRequest } from "@/lib/auth"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const userPayload = await getUserFromRequest(request)
    if (!userPayload || userPayload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { reason } = await request.json()

    const item = await Item.findByIdAndUpdate(
      params.id,
      {
        status: "rejected",
        rejectionReason: reason,
        approvedBy: userPayload.userId,
      },
      { new: true },
    ).populate("owner", "name email")

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    return NextResponse.json({ item })
  } catch (error) {
    console.error("Reject item error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
