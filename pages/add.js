"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "../lib/axios";
import toast from "react-hot-toast";
 import { getAuth } from "firebase/auth";
import Cookies from "js-cookie";
const AddRecipePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
  title: "",
  description: "",
  imageUrl: "",
  ingredients: "",
  steps: "",
  cuisine: "",
  tags: "",
  dietaryPreference: "",
  difficulty: "",
  spiceLevel: "",
  cookTime: "",
  specialTechniques: "",
  utensilsRequired: ""
});


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else router.push("/login");
    });
  }, []);
useEffect(() => {
    const userCookie = Cookies.get('cravifyUser');

    if (!userCookie) {
      // No user found, redirect to homepage
      router.push('/');
    }
  }, []);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      toast.error("You must be logged in to add a recipe.");
      return;
    }

    const idToken = await user.getIdToken();

    const formattedIngredients = formData.ingredients
      .split(",")
      .map((item) => ({ name: item.trim() }))
      .filter((item) => item.name);

    const formattedSteps = formData.steps
      .split(".")
      .map((step) => ({ instruction: step.trim() }))
      .filter((step) => step.instruction);

    const formattedTags = Array.isArray(formData.tags)
      ? formData.tags
      : formData.tags.split(",").map((tag) => tag.trim().toLowerCase());

    const res = await axios.post(
      "/recipes/add",
      {
        ...formData,
        ingredients: formattedIngredients,
        steps: formattedSteps,
        tags: formattedTags,
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    toast.success("Recipe added!");
    router.push("/");
  } catch (error) {
    console.error("Error creating recipe:", error);
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
};



  return (
    <div className="min-h-screen p-0 bg-gradient-to-br from-orange-100 via-white to-blue-100">
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-blue-500 text-white py-12 px-4 overflow-hidden shadow-xl mb-8 rounded-b-3xl">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "url('/pattern.svg'), linear-gradient(135deg, #f97316 0%, #2563eb 100%)",
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="relative max-w-2xl mx-auto text-center z-10">
          <h2 className="text-4xl font-extrabold mb-2 font-poppins drop-shadow-lg tracking-tight">
            Add New Recipe
          </h2>
          <p className="text-lg opacity-90 font-semibold mb-2">
            Share your culinary creation with the Cravify community!
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto py-10 px-4 bg-white rounded-3xl shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
  {/* Title */}
  <div>
    <label className="block font-medium text-orange-600 mb-1">Title</label>
    <input
      name="title"
      maxLength={100}
      value={formData.title}
      onChange={handleChange}
      className="w-full border text-blue-900 p-2 rounded-full bg-orange-50 focus:ring-2 text-lg shadow-sm"
      required
    />
  </div>

  {/* Description */}
  <div>
    <label className="block font-medium text-orange-600 mb-1">Description</label>
    <textarea
      name="description"
      maxLength={500}
      rows={3}
      value={formData.description}
      onChange={handleChange}
      className="w-full border text-blue-900 p-2 rounded-xl bg-orange-50 focus:ring-2 text-lg shadow-sm"
      required
    />
  </div>

  {/* Image URL */}
  <div>
    <label className="block font-medium text-orange-600 mb-1">Image URL</label>
    <input
      name="imageUrl"
      type="url"
      value={formData.imageUrl}
      onChange={handleChange}
      className="w-full border text-blue-900 p-2 rounded-full bg-orange-50 focus:ring-2 text-lg shadow-sm"
      required
    />
  </div>

  {/* Ingredients */}
  <div>
    <label className="block font-medium text-orange-600 mb-1">Ingredients (comma separated)</label>
    <input
      name="ingredients"
      value={formData.ingredients}
      onChange={handleChange}
      className="w-full border text-blue-900 p-2 rounded-full bg-orange-50 focus:ring-2 text-lg shadow-sm"
      required
    />
  </div>

  {/* Steps */}
  <div>
    <label className="block font-medium text-orange-600 mb-1">Steps (separated by period)</label>
    <textarea
      name="steps"
      rows={4}
      value={formData.steps}
      onChange={handleChange}
      className="w-full border text-blue-900 p-2 rounded-xl bg-orange-50 focus:ring-2 text-lg shadow-sm"
      required
    />
  </div>

  {/* Cuisine */}
  <div>
    <label className="block font-medium text-orange-600 mb-1">Cuisine</label>
    <select
      name="cuisine"
      value={formData.cuisine}
      onChange={handleChange}
      required
      className="w-full border p-2 rounded-full bg-orange-50 text-blue-900 text-lg shadow-sm"
    >
      <option value="">Select cuisine</option>
      <option value="indian">Indian</option>
      <option value="italian">Italian</option>
      <option value="mexican">Mexican</option>
      <option value="chinese">Chinese</option>
      <option value="japanese">Japanese</option>
      <option value="french">French</option>
    </select>
  </div>

  {/* Tags */}
  <div>
    <label className="block font-medium text-orange-600 mb-1">Tags (comma separated)</label>
    <input
      name="tags"
      value={formData.tags}
      onChange={handleChange}
      className="w-full border text-blue-900 p-2 rounded-full bg-orange-50 focus:ring-2 text-lg shadow-sm"
      required
    />
  </div>

  {/* Dietary Preference */}
  <div>
    <label className="block font-medium text-orange-600 mb-1">Dietary Preference</label>
    <select
      name="dietaryPreference"
      value={formData.dietaryPreference}
      onChange={handleChange}
      required
      className="w-full border p-2 rounded-full bg-orange-50 text-blue-900 text-lg shadow-sm"
    >
      <option value="">Select</option>
      <option value="vegetarian">Vegetarian</option>
      <option value="vegan">Vegan</option>
      <option value="non-vegetarian">Non-Vegetarian</option>
      <option value="gluten-free">Gluten-Free</option>
      <option value="keto">Keto</option>
    </select>
  </div>

  {/* Difficulty */}
  <div>
    <label className="block font-medium text-orange-600 mb-1">Difficulty</label>
    <select
      name="difficulty"
      value={formData.difficulty}
      onChange={handleChange}
      required
      className="w-full border p-2 rounded-full bg-orange-50 text-blue-900 text-lg shadow-sm"
    >
      <option value="">Select</option>
      <option value="Easy">Easy</option>
      <option value="Medium">Medium</option>
      <option value="Hard">Hard</option>
    </select>
  </div>

  {/* Spice Level */}
  <div>
    <label className="block font-medium text-orange-600 mb-1">Spice Level (1 to 5)</label>
    <input
      type="number"
      name="spiceLevel"
      value={formData.spiceLevel}
      onChange={handleChange}
      min={1}
      max={5}
      className="w-full border text-blue-900 p-2 rounded-full bg-orange-50 focus:ring-2 text-lg shadow-sm"
      required
    />
  </div>

  {/* Cook Time */}
  <div>
    <label className="block font-medium text-orange-600 mb-1">Cook Time (minutes)</label>
    <input
      name="cookTime"
      type="number"
      value={formData.cookTime}
      onChange={handleChange}
      min={1}
      className="w-full border text-blue-900 p-2 rounded-full bg-orange-50 focus:ring-2 text-lg shadow-sm"
      required
    />
  </div>

  {/* Special Techniques */}
  <div>
    <label className="block font-medium text-orange-600 mb-1">Special Techniques (optional)</label>
    <input
      name="specialTechniques"
      value={formData.specialTechniques}
      onChange={handleChange}
      className="w-full border text-blue-900 p-2 rounded-full bg-orange-50 focus:ring-2 text-lg shadow-sm"
    />
  </div>

  {/* Utensils Required */}
  <div>
    <label className="block font-medium text-orange-600 mb-1">Utensils Required (optional)</label>
    <input
      name="utensilsRequired"
      value={formData.utensilsRequired}
      onChange={handleChange}
      className="w-full border text-blue-900 p-2 rounded-full bg-orange-50 focus:ring-2 text-lg shadow-sm"
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200 shadow-xl scale-100 hover:scale-105"
  >
    Submit
  </button>
</form>

      </div>
    </div>
  );
};

export default AddRecipePage;
