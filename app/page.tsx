import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Recycle, Users, Leaf, ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const featuredItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    condition: "Good",
    points: 25,
    image: "/placeholder.svg?height=200&width=200",
    user: "Sarah M.",
  },
  {
    id: 2,
    title: "Designer Silk Blouse",
    category: "Tops",
    condition: "Excellent",
    points: 35,
    image: "/placeholder.svg?height=200&width=200",
    user: "Emma K.",
  },
  {
    id: 3,
    title: "Athletic Running Shoes",
    category: "Footwear",
    condition: "Like New",
    points: 40,
    image: "/placeholder.svg?height=200&width=200",
    user: "Mike R.",
  },
  {
    id: 4,
    title: "Wool Winter Coat",
    category: "Outerwear",
    condition: "Good",
    points: 50,
    image: "/placeholder.svg?height=200&width=200",
    user: "Lisa T.",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Recycle className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">ReWear</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900">
              How It Works
            </Link>
            <Link href="#featured" className="text-gray-600 hover:text-gray-900">
              Featured Items
            </Link>
            <Link href="/browse" className="text-gray-600 hover:text-gray-900">
              Browse
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Sustainable Fashion
            <span className="block text-green-600">Starts Here</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of eco-conscious fashion lovers. Exchange unused clothing, earn points, and help reduce
            textile waste while refreshing your wardrobe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Start Swapping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/browse">
              <Button size="lg" variant="outline">
                Browse Items
              </Button>
            </Link>
            <Link href="/add-item">
              <Button size="lg" variant="outline">
                List an Item
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Active Members</p>
            </div>
            <div className="flex flex-col items-center">
              <Recycle className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50,000+</h3>
              <p className="text-gray-600">Items Exchanged</p>
            </div>
            <div className="flex flex-col items-center">
              <Leaf className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">25 Tons</h3>
              <p className="text-gray-600">Textile Waste Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How ReWear Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">List Your Items</h3>
              <p className="text-gray-600">
                Upload photos and details of clothing you no longer wear. Set swap preferences or point values.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse & Request</h3>
              <p className="text-gray-600">
                Discover items you love and send swap requests or use points to redeem items directly.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Exchange & Earn</h3>
              <p className="text-gray-600">
                Complete swaps, earn points for successful exchanges, and build your sustainable wardrobe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section id="featured" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Items</h2>
            <Link href="/browse">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600">{item.points} pts</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{item.condition}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{item.user}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Sustainable Fashion Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of users making a positive impact on the environment</p>
          <Link href="/signup">
            <Button size="lg" variant="secondary">
              Join ReWear Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Recycle className="h-6 w-6" />
                <span className="text-xl font-bold">ReWear</span>
              </div>
              <p className="text-gray-400">Making fashion sustainable, one swap at a time.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/browse" className="hover:text-white">
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link href="/add-item" className="hover:text-white">
                    List an Item
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/guidelines" className="hover:text-white">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ReWear. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
