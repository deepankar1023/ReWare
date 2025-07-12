import mongoose, { Schema, type Document } from "mongoose"

export interface ISwap extends Document {
  _id: string
  requester: string
  owner: string
  requestedItem: string
  offeredItem?: string
  pointsOffered?: number
  type: "item-swap" | "points-redemption"
  status: "pending" | "accepted" | "rejected" | "completed" | "cancelled"
  message?: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

const SwapSchema = new Schema<ISwap>(
  {
    requester: { type: Schema.Types.ObjectId, ref: "User", required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    requestedItem: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    offeredItem: { type: Schema.Types.ObjectId, ref: "Item" },
    pointsOffered: { type: Number },
    type: {
      type: String,
      enum: ["item-swap", "points-redemption"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
      default: "pending",
    },
    message: { type: String },
    completedAt: { type: Date },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Swap || mongoose.model<ISwap>("Swap", SwapSchema)
