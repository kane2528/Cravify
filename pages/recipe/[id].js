import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../lib/axios";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const RecipeDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchRecipe = async () => {
                try {
                    const res = await api.get(`/api/recipes/recipes/${id}`);
                    setRecipe(res.data);
                } catch (error) {
                    console.error("Error fetching recipe:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchRecipe();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-orange-100 via-white to-blue-100">
                <Loader2 className="animate-spin w-6 h-6 text-orange-500" />
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-orange-100 via-white to-blue-100">
                <div className="text-center text-red-500 mt-10 bg-white rounded-3xl shadow-2xl px-8 py-6">
                    Recipe not found
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-blue-100 py-10 px-2">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl px-6 py-10">
                <h1 className="text-3xl font-extrabold text-orange-500 mb-2 font-poppins drop-shadow-lg tracking-tight">
                    {recipe.title}
                </h1>
                <p className="text-gray-600 mb-4">{recipe.description}</p>

                <div className="w-full h-80 relative mb-8 rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src="/foodpac.jpg" // ✅ fallback to foodpac.jpg
                        alt={recipe.title || "Recipe Image"}
                        layout="fill"
                        objectFit="cover"
                        className="object-cover"
                    />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-orange-600">Ingredients</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {recipe.ingredients.map((ing) => (
                                <li key={ing.id}>
                                    {ing.quantity} {ing.name} {ing.notes && `(${ing.notes})`}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-orange-600">Steps</h2>
                        <ol className="list-decimal list-inside text-gray-700 space-y-1">
                            {recipe.steps.map((step) => (
                                <li key={step.id}>{step.instruction}</li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
                    <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                    <p><strong>Spice Level:</strong> {recipe.spiceLevel}/5</p>
                    <p><strong>Prep Time:</strong> {recipe.prepTime} mins</p>
                    <p><strong>Cook Time:</strong> {recipe.cookTime} mins</p>
                    <p><strong>Serves:</strong> {recipe.serves}</p>
                    <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                   
                </div>

                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2 text-orange-600">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                        {recipe.tags.map((tag) => (
                            <span key={tag} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {recipe.specialTechniques.length > 0 && (
                    <p className="mt-2"><strong>Techniques:</strong> {recipe.specialTechniques.join(", ")}</p>
                )}

                {recipe.utensilsRequired.length > 0 && (
                    <p className="mt-2 text-orange-500"><strong>Utensils:</strong> {recipe.utensilsRequired.join(", ")}</p>
                )}

                <div className="mt-6">
                    <p className="text-gray-500 text-sm">
                        Created At: {new Date(recipe.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
