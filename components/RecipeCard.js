import Link from "next/link"
import Image from "next/image"
import { Clock, Star } from "lucide-react"

export default function RecipeCard({ recipe }) {
  return (
    <Link href={`/recipe/${recipe.id}`} className="group">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
        {/* Recipe Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={recipe.image || "/foodpac.jpg"}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                recipe.difficulty === "Easy"
                  ? "bg-green-100 text-green-800"
                  : recipe.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {recipe.difficulty}
            </span>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-200">
            {recipe.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>

          {/* Recipe Meta */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {recipe.cookTime}
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
              4.8
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
