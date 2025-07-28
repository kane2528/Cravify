import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const AIGenerateRecipe = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const idToken = await firebaseUser.getIdToken();

        try {
          const res = await axios.get("/api/ai/chats", {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });
          setChats(res.data.chats);
        } catch (err) {
          console.error("Failed to fetch chats", err);
          toast.error("Could not load previous chats");
        }
      }
    });

    return () => unsubscribe();
  }, []);
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get('accessToken');

    if (!userCookie) {
      // No user found, redirect to homepage
      router.push('/');
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return toast.error("Prompt cannot be empty");

    try {
      setLoading(true);
      const idToken = await user.getIdToken();

      const res = await axios.post(
        "/api/ai/generate",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          withCredentials: false
        }
      );

      setResult(res.data.recipe);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get recipe");
    } finally {
      setLoading(false);
    }
  };
  const downloadRecipeAsPDF = (recipe) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(recipe.title || 'Untitled Recipe', 10, 10);

  doc.setFontSize(12);
  doc.text(`Description: ${recipe.description || 'No description provided'}`, 10, 20);
  doc.text(`Cook Time: ${recipe.cookTime || 'N/A'} minutes`, 10, 30);

  doc.text('Ingredients', 10, 40);
  recipe.ingredients?.forEach((ingredient, index) => {
    doc.text(`- ${ingredient}`, 10, 50 + index * 10);
  });

  doc.save(`${recipe.title || 'recipe'}.pdf`);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8 flex gap-6">
        {/* Sidebar */}
        <div className="w-[25%] bg-orange-100 rounded-xl p-4 max-h-[600px] overflow-y-auto">
          <h2 className="text-lg font-semibold text-orange-700 mb-2">Previous Chats</h2>
          {chats.length === 0 ? (
            <p className="text-sm text-gray-500">No chats yet</p>
          ) : (
            <ul className="space-y-2">
              {chats.map((chat) => {
                const date = new Date(chat.createdAt);
                const formattedDate = date.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <li
                    key={chat._id}
                    className={`relative flex items-start justify-between p-2 rounded-lg cursor-pointer ${selectedChat === chat._id
                      ? "bg-orange-300 text-white"
                      : "hover:bg-orange-200 text-orange-800"
                      }`}
                  >
                    {/* When clicked, show that chat */}
                    <div
                      className="flex-1"
                      onClick={() => {
                        setResult(chat.response);
                        setPrompt(chat.prompt);
                        setSelectedChat(chat._id);
                      }}
                    >
                      <div className="font-medium">
                        {chat.prompt.length > 40 ? chat.prompt.slice(0, 40) + "..." : chat.prompt}
                      </div>
                      <div className="text-xs text-gray-600">{formattedDate}</div>
                    </div>

                    {/* 🗑️ Delete button */}
                    <button
                      onClick={async (e) => {
                        e.stopPropagation(); // prevent selecting the chat when delete is clicked
                        setChatToDelete(chat); // set chat to delete
                        setShowDeleteModal(true);
                      }}
                      title="Delete Chat"
                      className="text-red-600 hover:text-red-800 ml-2 text-sm"
                    >
                      🗑️
                    </button>
                  </li>

                );
              })}

            </ul>

          )}
          {showDeleteModal && chatToDelete && (
            <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-blue-100  rounded-xl p-6 max-w-md shadow-lg border">
                <h2 className="text-xl font-semibold text-red-600 mb-4">Confirm Delete</h2>
                <p className="text-gray-700 mb-6">
                  Are you sure you want to delete this chat:
                  <br />
                  <span className="font-medium text-orange-700">{chatToDelete.prompt.slice(0, 40)}...</span>
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const idToken = await user.getIdToken();
                        await axios.delete(`/api/ai/chat/${chatToDelete._id}`, {
                          headers: {
                            Authorization: `Bearer ${idToken}`,
                          },
                        });
                        setChats((prev) => prev.filter((c) => c._id !== chatToDelete._id));
                        toast.success("Chat deleted");
                      } catch (err) {
                        console.error("Delete failed", err);
                        toast.error("Could not delete chat");
                      } finally {
                        setShowDeleteModal(false);
                        setChatToDelete(null);
                      }
                    }}
                    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>


        {/* Main Panel */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center">
            AI Recipe Generator 🍽️
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              rows={4}
              className="w-full text-blue-900 p-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 text-lg"
              placeholder="E.g. Make a healthy breakfast with oats and banana"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-200"
            >
              {loading ? "Generating..." : "Generate Recipe"}
            </button>
          </form>

          {result && (
            <>
              <div
                id="recipe-result" className="mt-6 bg-orange-50 border border-orange-200 p-6 rounded-2xl shadow-inner whitespace-pre-wrap text-blue-900">
                <h2 className="text-2xl font-bold text-orange-600 mb-2">Your Recipe:</h2>
                <p>{result}</p>
              </div>
            
            </>
          )}


        </div>
      </div>
    </div>
  );

};

export default AIGenerateRecipe;
