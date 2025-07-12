import mongoose, { Schema, type Document } from "mongoose"

export interface IReport extends Document {
  _id: string
  reporter: mongoose.Types.ObjectId
  reportedItem?: mongoose.Types.ObjectId
  reportedUser?: mongoose.Types.ObjectId
  reason: string
  description: string
  status: "pending" | "reviewed" | "resolved" | "dismissed"
  createdAt: Date
  reviewedAt?: Date
  reviewedBy?: mongoose.Types.ObjectId
}

const ReportSchema = new Schema<IReport>({
  reporter: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reportedItem: { type: Schema.Types.ObjectId, ref: "Item" },
  reportedUser: { type: Schema.Types.ObjectId, ref: "User" },
  reason: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "reviewed", "resolved", "dismissed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date },
  reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
})

export default mongoose.models.Report || mongoose.model<IReport>("Report", ReportSchema)
