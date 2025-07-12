import mongoose, { type Document, Schema } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
  email: string
  password: string
  firstName: string
  lastName: string
  role: "user" | "admin"
  points: number
  rating: number
  totalSwaps: number
  successfulSwaps: number
  location?: {
    city: string
    state: string
    country: string
  }
  avatar?: string
  bio?: string
  preferences: {
    emailNotifications: boolean
    profileVisibility: "public" | "private"
    autoApproveSwaps: boolean
  }
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5,
    },
    totalSwaps: {
      type: Number,
      default: 0,
      min: 0,
    },
    successfulSwaps: {
      type: Number,
      default: 0,
      min: 0,
    },
    location: {
      city: String,
      state: String,
      country: String,
    },
    avatar: String,
    bio: String,
    preferences: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      profileVisibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
      },
      autoApproveSwaps: {
        type: Boolean,
        default: false,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Remove password from JSON output
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
