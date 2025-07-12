const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/rewear"

// Define schemas (simplified for seeding)
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" },
  points: { type: Number, default: 100 },
  avatar: String,
  bio: String,
  location: String,
  joinedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  rating: { type: Number, default: 5.0 },
  totalSwaps: { type: Number, default: 0 },
})

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
  isActive: { type: Boolean, default: true },
})

const ItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  type: String,
  size: String,
  condition: String,
  brand: String,
  color: String,
  images: [String],
  tags: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pointsValue: Number,
  status: { type: String, default: "approved" },
  isAvailable: { type: Boolean, default: true },
  swapPreferences: [String],
  views: { type: Number, default: 0 },
  favorites: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

// Create models
const User = mongoose.models.User || mongoose.model("User", UserSchema)
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema)
const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema)

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...")

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log("✅ Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Category.deleteMany({})
    await Item.deleteMany({})
    console.log("🗑️ Cleared existing data")

    // Hash password
    const hashedPassword = await bcrypt.hash("password123", 12)

    // Create users
    const users = await User.create([
      {
        name: "Admin User",
        email: "admin@rewear.com",
        password: hashedPassword,
        role: "admin",
        points: 1000,
        bio: "Platform administrator",
        location: "New York, NY",
        rating: 5.0,
        totalSwaps: 0,
      },
      {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        password: hashedPassword,
        points: 250,
        bio: "Fashion enthusiast and sustainable living advocate",
        location: "Los Angeles, CA",
        rating: 4.8,
        totalSwaps: 12,
      },
      {
        name: "Mike Chen",
        email: "mike@example.com",
        password: hashedPassword,
        points: 180,
        bio: "Minimalist lifestyle, love trading quality pieces",
        location: "San Francisco, CA",
        rating: 4.9,
        totalSwaps: 8,
      },
      {
        name: "Emma Wilson",
        email: "emma@example.com",
        password: hashedPassword,
        points: 320,
        bio: "Vintage collector and eco-conscious shopper",
        location: "Portland, OR",
        rating: 4.7,
        totalSwaps: 15,
      },
    ])

    console.log("👥 Created users")

    // Create categories
    const categories = await Category.create([
      {
        name: "Tops",
        description: "T-shirts, blouses, sweaters, and more",
        icon: "Shirt",
      },
      {
        name: "Bottoms",
        description: "Jeans, pants, skirts, and shorts",
        icon: "Pants",
      },
      {
        name: "Dresses",
        description: "Casual and formal dresses",
        icon: "Dress",
      },
      {
        name: "Outerwear",
        description: "Jackets, coats, and blazers",
        icon: "Jacket",
      },
      {
        name: "Shoes",
        description: "Sneakers, boots, heels, and sandals",
        icon: "Shoe",
      },
      {
        name: "Accessories",
        description: "Bags, jewelry, and other accessories",
        icon: "Bag",
      },
    ])

    console.log("📂 Created categories")

    // Create sample items
    const sampleItems = [
      {
        title: "Vintage Levi's Denim Jacket",
        description: "Classic blue denim jacket in excellent condition. Perfect for layering!",
        category: "Outerwear",
        type: "Jacket",
        size: "M",
        condition: "good",
        brand: "Levi's",
        color: "Blue",
        images: ["/placeholder.jpg"],
        tags: ["vintage", "denim", "classic"],
        owner: users[1]._id,
        pointsValue: 60,
        swapPreferences: ["Tops", "Accessories"],
      },
      {
        title: "Floral Summer Dress",
        description: "Beautiful floral print dress, perfect for summer occasions.",
        category: "Dresses",
        type: "Casual Dress",
        size: "S",
        condition: "like-new",
        brand: "Zara",
        color: "Multicolor",
        images: ["/placeholder.jpg"],
        tags: ["floral", "summer", "casual"],
        owner: users[2]._id,
        pointsValue: 80,
        swapPreferences: ["Dresses", "Tops"],
      },
      {
        title: "Nike Air Max Sneakers",
        description: "Comfortable running shoes in great condition. Size 9.",
        category: "Shoes",
        type: "Sneakers",
        size: "9",
        condition: "good",
        brand: "Nike",
        color: "White",
        images: ["/placeholder.jpg"],
        tags: ["nike", "sneakers", "running"],
        owner: users[3]._id,
        pointsValue: 60,
        swapPreferences: ["Shoes", "Activewear"],
      },
      {
        title: "Cashmere Sweater",
        description: "Luxurious cashmere sweater in cream color. Very soft and warm.",
        category: "Tops",
        type: "Sweater",
        size: "L",
        condition: "like-new",
        brand: "Uniqlo",
        color: "Cream",
        images: ["/placeholder.jpg"],
        tags: ["cashmere", "luxury", "warm"],
        owner: users[1]._id,
        pointsValue: 80,
        swapPreferences: ["Tops", "Outerwear"],
      },
      {
        title: "High-Waisted Black Jeans",
        description: "Trendy high-waisted jeans that are super comfortable and flattering.",
        category: "Bottoms",
        type: "Jeans",
        size: "28",
        condition: "good",
        brand: "American Eagle",
        color: "Black",
        images: ["/placeholder.jpg"],
        tags: ["high-waisted", "black", "trendy"],
        owner: users[2]._id,
        pointsValue: 60,
        swapPreferences: ["Bottoms", "Dresses"],
      },
      {
        title: "Leather Crossbody Bag",
        description: "Genuine leather crossbody bag in brown. Perfect for everyday use.",
        category: "Accessories",
        type: "Bag",
        size: "One Size",
        condition: "good",
        brand: "Coach",
        color: "Brown",
        images: ["/placeholder.jpg"],
        tags: ["leather", "crossbody", "everyday"],
        owner: users[3]._id,
        pointsValue: 60,
        swapPreferences: ["Accessories", "Shoes"],
      },
    ]

    await Item.create(sampleItems)
    console.log("👕 Created sample items")

    console.log("🎉 Database seeding completed successfully!")
    console.log("\n📋 Login credentials:")
    console.log("Admin: admin@rewear.com / password123")
    console.log("User: sarah@example.com / password123")

    process.exit(0)
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  }
}

// Run the seeding
seedDatabase()
