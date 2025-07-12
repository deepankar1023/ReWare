import mongoose, { Schema, type Document } from "mongoose"

export interface IReport extends Document {
  _id: string
  reporter: string
  reportedItem?: string
  reportedUser?: string
  reason: string
  description: string
  status: "pending" | "reviewed" | "resolved" | "dismissed"
  reviewedBy?: string
  reviewedAt?: Date
  createdAt: Date
}

const ReportSchema = new Schema<IReport>(
  {
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
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedAt: { type: Date },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Report || mongoose.model<IReport>("Report", ReportSchema)
