"use client"

import Link from "next/link"
import Head from "next/head"
import { Home, Search, ChefHat, ArrowLeft, Sparkles } from "lucide-react"

export default function NotFound() {
  return (
    <>
      
      

        <div className="relative max-w-4xl py-12 mx-auto text-center">
          {/* Animated Chef Hat */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="bg-gradient-to-br from-orange-500 to-blue-600 p-6 rounded-3xl shadow-2xl animate-bounce">
                <ChefHat className="w-16 h-16 text-white" />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 animate-pulse">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 bg-red-400 rounded-full p-2 animate-pulse delay-300">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* 404 Text */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent mb-4 font-poppins">
              404
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent w-20"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Recipe Not Found</h2>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent w-20"></div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
              Oops! It looks like this recipe has gone missing from our kitchen. 
              Do not worry, we have plenty of other delicious dishes waiting for you!
            </p>
            <p className="text-gray-500">
              The page you are looking for might have been moved, deleted, or never existed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/"
              className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 shadow-2xl hover:shadow-orange-500/25 hover:scale-105"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Back to Home
            </Link>
            
         
          </div>

          {/* Suggestions */}
          
      </div>
    </>
  )
}
