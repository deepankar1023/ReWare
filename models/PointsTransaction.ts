import mongoose, { Schema, type Document } from "mongoose"

export interface IPointsTransaction extends Document {
  _id: string
  user: mongoose.Types.ObjectId
  type: "earned" | "spent" | "bonus" | "penalty"
  amount: number
  description: string
  relatedItem?: mongoose.Types.ObjectId
  relatedSwap?: mongoose.Types.ObjectId
  createdAt: Date
}

const PointsTransactionSchema = new Schema<IPointsTransaction>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: ["earned", "spent", "bonus", "penalty"],
    required: true,
  },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  relatedItem: { type: Schema.Types.ObjectId, ref: "Item" },
  relatedSwap: { type: Schema.Types.ObjectId, ref: "Swap" },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.PointsTransaction ||
  mongoose.model<IPointsTransaction>("PointsTransaction", PointsTransactionSchema)
