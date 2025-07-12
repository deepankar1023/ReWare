import mongoose, { Schema, type Document } from "mongoose"

export interface IItem extends Document {
  _id: string
  title: string
  description: string
  category: string
  type: string
  size: string
  condition: "new" | "like-new" | "good" | "fair" | "poor"
  brand?: string
  color?: string
  images: string[]
  tags: string[]
  owner: mongoose.Types.ObjectId
  pointsValue: number
  status: "pending" | "approved" | "rejected" | "swapped" | "removed"
  isAvailable: boolean
  swapPreferences: string[]
  createdAt: Date
  updatedAt: Date
  approvedAt?: Date
  approvedBy?: mongoose.Types.ObjectId
  rejectionReason?: string
  views: number
  favorites: number
}

const ItemSchema = new Schema<IItem>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  condition: {
    type: String,
    enum: ["new", "like-new", "good", "fair", "poor"],
    required: true,
  },
  brand: { type: String },
  color: { type: String },
  images: [{ type: String }],
  tags: [{ type: String }],
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  pointsValue: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "swapped", "removed"],
    default: "pending",
  },
  isAvailable: { type: Boolean, default: true },
  swapPreferences: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  approvedAt: { type: Date },
  approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
  rejectionReason: { type: String },
  views: { type: Number, default: 0 },
  favorites: { type: Number, default: 0 },
})

export default mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema)
