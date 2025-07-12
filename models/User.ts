import mongoose, { Schema, type Document } from "mongoose"

export interface IUser extends Document {
  _id: string
  name: string
  email: string
  password: string
  role: "user" | "admin"
  points: number
  avatar?: string
  bio?: string
  location?: string
  joinedAt: Date
  isActive: boolean
  rating: number
  totalSwaps: number
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  points: { type: Number, default: 100 },
  avatar: { type: String },
  bio: { type: String },
  location: { type: String },
  joinedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  rating: { type: Number, default: 5.0 },
  totalSwaps: { type: Number, default: 0 },
})

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
