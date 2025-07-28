import Link from "next/link"
import { ChefHat, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold font-poppins">Cravify</span>
            </div>
            <p className="text-gray-300 mb-4 text-lg">powered by Recipedia AI</p>
            <p className="text-gray-400 max-w-md">
              Discover, create, and share amazing recipes with our community of food lovers. Let AI help you find the
              perfect dish for any craving.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/ai" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  AI Generator
                </Link>
              </li>
              <li>
                <Link href="/add" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  Add Recipe
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  Browse Recipes
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> for food lovers everywhere
          </p>
          <p className="text-gray-500 mt-2">© 2024 Cravify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
