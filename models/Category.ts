import mongoose, { Schema, type Document } from "mongoose"

export interface ICategory extends Document {
  _id: string
  name: string
  description: string
  icon: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema)
