import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Category from "@/models/Category"

export async function GET() {
  try {
    await connectDB()

    const categories = await Category.find({ isActive: true }).sort({ name: 1 })

    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Get categories error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()

    const { name, description, icon } = await request.json()

    if (!name || !description || !icon) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const category = await Category.create({
      name,
      description,
      icon,
    })

    return NextResponse.json({ category }, { status: 201 })
  } catch (error) {
    console.error("Create category error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
