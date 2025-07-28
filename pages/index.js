import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import RecipeCard from "@/components/RecipeCard"
import Link from "next/link"
import { Search, Sparkles, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import api from "@/lib/axios"

// Sample recipe data for the home page


const categories = ["All Recipes", "Italian", "Thai", "Dessert", "Healthy", "BBQ", "Vegetarian"]

export default function Home() {
	  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const res = await api.get('/recipes'); // ✅ Change path if needed
      setRecipes(res.data);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);
	return (
		<div className="min-h-screen p-0 bg-gradient-to-br from-orange-100 via-white to-blue-100">

			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-blue-500 text-white py-20 px-4 overflow-hidden shadow-xl">
				{/* Decorative background pattern */}
				<div
					className="absolute inset-0 opacity-20 pointer-events-none"
					style={{
						background:
							"url('/pattern.svg'), linear-gradient(135deg, #f97316 0%, #2563eb 100%)",
						backgroundBlendMode: "overlay",
						backgroundSize: "cover",
					}}
				></div>
				<div className="relative max-w-6xl mx-auto text-center z-10">
					<h1 className="text-5xl md:text-6xl font-extrabold mb-6 font-poppins drop-shadow-lg tracking-tight">
						Cravify
					</h1>
					<p className="text-xl md:text-2xl mb-8 opacity-90 font-semibold">
						powered by Recipedia AI
					</p>
					<p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-80">
						Discover amazing recipes, create your own, or let our AI generate the
						perfect dish for your cravings
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Link
							href="/ai"
							className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 flex items-center gap-2 shadow-xl scale-100 hover:scale-105"
						>
							<Sparkles className="w-5 h-5" />
							Use AI Generator
						</Link>
						<Link
							href="/add"
							className="bg-white text-orange-600 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 flex items-center gap-2 shadow-xl border border-orange-200 hover:border-blue-300 scale-100 hover:scale-105"
						>
							<Plus className="w-5 h-5" />
							Add a Recipe
						</Link>
					</div>
				</div>
			</section>

			{/* Search and Categories Section */}
			<section className="py-12 px-4">
				<div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
					{/* Search Bar */}
					<div className="relative max-w-2xl mx-auto mb-8">
						<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
						{/* <input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') fetchRecipes();
							}}
							placeholder="Search for recipes..."
							className="w-full pl-12 pr-4 py-4 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-lg shadow-sm bg-orange-50"
						/> */}

					</div>

					{/* Category Tags */}
					<div className="flex flex-wrap justify-center gap-3 mb-12">
						{categories.map((category, idx) => (
							<button
								key={category}
								onClick={() => {
									setTags(category === 'All Recipes' ? '' : category);
									fetchRecipes();
								}}
								className={`px-6 py-2 rounded-full font-medium border transition-all duration-200 shadow-sm
      ${idx === 0
										? "bg-gradient-to-r from-orange-400 to-blue-400 text-white border-transparent hover:from-orange-500 hover:to-blue-500"
										: "bg-white border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-blue-400 hover:text-blue-600"
									}`}
							>
								{category}
							</button>
						))}
						

					</div>
				</div>
			</section>

			{/* Featured Recipes Section */}
			<section className="py-12 px-4 bg-gradient-to-br from-white via-orange-50 to-blue-50">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 drop-shadow-sm">
							Trending Recipes
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Discover the most popular recipes from our community of food lovers
						</p>
					</div>

					{/* Recipe Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{recipes.map((recipe) => (
							<div
								key={recipe.id}
								className="transition-all duration-200 hover:scale-105 hover:shadow-2xl rounded-2xl"
							>
								<RecipeCard recipe={recipe} />
							</div>
						))}
					</div>

					{/* View All Button */}
					<div className="text-center mt-12">
						<button className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-200 scale-100 hover:scale-105 border-2 border-white">
							View All Recipes
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}
