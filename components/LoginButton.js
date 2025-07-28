
'use client';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { LogOut } from "lucide-react";
import axios from '../lib/axios';
export default function LoginButton() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check cookie on load
    const userCookie = Cookies.get('cravifyUser');
    if (userCookie) {
      const parsed = JSON.parse(userCookie);
      setUserData(parsed);
    }
  }, []);

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const token = await user.getIdToken();

    await axios.post('/user', {
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // ✅ Store token in cookies if needed
    Cookies.set('accessToken', token, { expires: 7 });
    Cookies.set('cravifyUser', JSON.stringify({
      name: user.displayName,
      photoUrl: user.photoURL,
      email: user.email,
    }), { expires: 7 });

    setUserData({
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    });

  } catch (err) {
    console.error("Login failed", err);
  }
};


  const handleLogout = () => {
    Cookies.remove('cravifyUser');
    Cookies.remove('accessToken'); // Remove auth token
    auth.signOut();
    setUserData(null);
  };

  // UI
  if (userData) {
    console.log("Photo URL:", userData.photoUrl);
    return (
      <div className="flex bg-red-600 p-1 rounded-2xl items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center font-semibold text-sm">
          {userData?.displayName
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </div>

        <span className="text-white font-medium">{userData.displayName}</span>
        <button onClick={handleLogout} className="ml-2 text-white hover:text-black">
          <LogOut size={18} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      Login with Google
    </button>
  );
}
