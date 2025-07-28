
import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X, ChefHat, Sparkles, Plus, User, LogOut } from "lucide-react"
import { LogIn } from 'lucide-react';
import LoginButton from "./LoginButton";
import { toast } from "react-hot-toast";
import { auth } from "../lib/firebase" // import from your firebase config
import { onAuthStateChanged, signOut } from "firebase/auth"
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false) // This will be replaced with Firebase auth

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user)
        })
        return () => unsubscribe()
    }, [])
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <ChefHat className="w-8 h-8 text-orange-500" />
                        <span className="text-2xl font-bold text-gray-800 font-poppins">Cravify</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">

                        <Link
                            href={isLoggedIn ? "/ai" : "#"}
                            onClick={(e) => {
                                if (!isLoggedIn) {
                                    e.preventDefault();
                                    toast.error("Please login to access the AI Generator");
                                }
                            }}
                            className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 flex items-center gap-1"
                        >
                            <Sparkles className="w-4 h-4" />
                            AI Generator
                        </Link>
                        <Link
                            href={isLoggedIn ? "/add" : "#"}
                            onClick={(e) => {
                                if (!isLoggedIn) {
                                    e.preventDefault();
                                    toast.error("Please login to add a recipe");
                                }
                            }}
                            className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" />
                            Add Recipe
                        </Link>

                        {/* Auth Buttons */}
                        <LoginButton />

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-700 hover:text-orange-500 transition-colors duration-200"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/ai"
                                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 flex items-center gap-1"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Sparkles className="w-4 h-4" />
                                AI Generator
                            </Link>
                            <Link
                                href="/add"
                                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 flex items-center gap-1"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Plus className="w-4 h-4" />
                                Add Recipe
                            </Link>

                            {/* Mobile Auth */}
                            <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
                                <LoginButton />
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
