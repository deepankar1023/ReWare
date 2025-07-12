const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/rewear"

// Define schemas (simplified for seeding)
const userSchema = new mongoose.Schema({
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

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
  isActive: { type: Boolean, default: true },
})

const itemSchema = new mongoose.Schema({
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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  favorites: { type: Number, default: 0 },
})

// Create models
const User = mongoose.models.User || mongoose.model("User", userSchema)
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema)
const Item = mongoose.models.Item || mongoose.model("Item", itemSchema)

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Category.deleteMany({})
    await Item.deleteMany({})
    console.log("Cleared existing data")

    // Create users
    const hashedPassword = await bcrypt.hash("password123", 12)

    const users = await User.insertMany([
      {
        name: "Admin User",
        email: "admin@rewear.com",
        password: hashedPassword,
        role: "admin",
        points: 1000,
        avatar: "/placeholder-user.jpg",
        bio: "Platform administrator",
        location: "New York, NY",
      },
      {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        password: hashedPassword,
        points: 250,
        avatar: "/placeholder-user.jpg",
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
        avatar: "/placeholder-user.jpg",
        bio: "Love finding unique vintage pieces",
        location: "San Francisco, CA",
        rating: 4.9,
        totalSwaps: 8,
      },
      {
        name: "Emma Wilson",
        email: "emma@example.com",
        password: hashedPassword,
        points: 320,
        avatar: "/placeholder-user.jpg",
        bio: "Minimalist wardrobe, maximum style",
        location: "Seattle, WA",
        rating: 4.7,
        totalSwaps: 15,
      },
    ])

    console.log("Created users")

    // Create categories
    const categories = await Category.insertMany([
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
        description: "Sneakers, boots, heels, and flats",
        icon: "Shoe",
      },
      {
        name: "Accessories",
        description: "Bags, jewelry, and other accessories",
        icon: "Bag",
      },
    ])

    console.log("Created categories")

    // Create sample items
    const sampleItems = [
      {
        title: "Vintage Levi's Denim Jacket",
        description:
          "Classic blue denim jacket in excellent condition. Perfect for layering and adding a vintage touch to any outfit.",
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
        description: "Beautiful floral print dress perfect for summer occasions. Lightweight and comfortable fabric.",
        category: "Dresses",
        type: "Casual Dress",
        size: "S",
        condition: "like-new",
        brand: "Zara",
        color: "Floral",
        images: ["/placeholder.jpg"],
        tags: ["floral", "summer", "casual"],
        owner: users[2]._id,
        pointsValue: 80,
        swapPreferences: ["Dresses", "Tops"],
      },
      {
        title: "Black Leather Boots",
        description: "Stylish black leather ankle boots. Great for both casual and formal occasions.",
        category: "Shoes",
        type: "Boots",
        size: "8",
        condition: "good",
        brand: "Dr. Martens",
        color: "Black",
        images: ["/placeholder.jpg"],
        tags: ["leather", "boots", "versatile"],
        owner: users[3]._id,
        pointsValue: 60,
        swapPreferences: ["Shoes", "Accessories"],
      },
      {
        title: "Cashmere Sweater",
        description: "Luxurious cashmere sweater in cream color. Super soft and warm for winter.",
        category: "Tops",
        type: "Sweater",
        size: "M",
        condition: "new",
        brand: "Uniqlo",
        color: "Cream",
        images: ["/placeholder.jpg"],
        tags: ["cashmere", "luxury", "winter"],
        owner: users[1]._id,
        pointsValue: 100,
        swapPreferences: ["Tops", "Outerwear"],
      },
      {
        title: "High-Waisted Jeans",
        description: "Trendy high-waisted jeans in dark wash. Flattering fit and comfortable stretch.",
        category: "Bottoms",
        type: "Jeans",
        size: "29",
        condition: "like-new",
        brand: "American Eagle",
        color: "Dark Blue",
        images: ["/placeholder.jpg"],
        tags: ["high-waisted", "trendy", "comfortable"],
        owner: users[2]._id,
        pointsValue: 80,
        swapPreferences: ["Bottoms", "Tops"],
      },
      {
        title: "Designer Handbag",
        description: "Elegant designer handbag in excellent condition. Perfect for special occasions.",
        category: "Accessories",
        type: "Handbag",
        size: "One Size",
        condition: "good",
        brand: "Michael Kors",
        color: "Brown",
        images: ["/placeholder.jpg"],
        tags: ["designer", "elegant", "luxury"],
        owner: users[3]._id,
        pointsValue: 60,
        swapPreferences: ["Accessories", "Shoes"],
      },
    ]

    await Item.insertMany(sampleItems)
    console.log("Created sample items")

    console.log("Database seeded successfully!")
    console.log("\nDefault login credentials:")
    console.log("Admin: admin@rewear.com / password123")
    console.log("User: sarah@example.com / password123")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
  }
}

seedDatabase()
