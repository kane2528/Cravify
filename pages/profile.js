import { useEffect, useState } from 'react';
import axios from '../lib/axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get('accessToken');
      if (!token) return router.push('/');

      try {
        const res = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

    const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!profile) return <div className="p-6 text-center">No profile data.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-blue-100 p-0">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-blue-500 text-white py-16 px-4 overflow-hidden shadow-xl mb-10">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, #f97316 0%, #2563eb 100%)",
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="relative max-w-2xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 font-poppins drop-shadow-lg tracking-tight">
            My Profile
          </h1>
          <p className="text-lg md:text-xl opacity-90 font-semibold">
            View and manage your Cravify account
          </p>
        </div>
      </section>

      {/* Profile Card */}
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 -mt-24 relative z-10">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-orange-100 border-4 border-orange-400 shadow-lg flex items-center justify-center text-3xl font-bold text-orange-600">
            {getInitials(profile.name)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{profile.name}</h2>
            <p className="text-gray-600 font-medium">{profile.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Email Verified:{' '}
              <span className={profile.emailVerified ? 'text-green-600' : 'text-red-500'}>
                {profile.emailVerified ? '✅ Yes' : '❌ No'}
              </span>
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <span className="font-semibold text-orange-600">Account Created:</span>{' '}
            {dayjs(profile.createdAt).format('DD MMM YYYY, hh:mm A')}
          </p>
          <p>
            <span className="font-semibold text-blue-600">Firebase UID:</span> {profile.firebaseUid}
          </p>
        </div>
      </div>
    </div>
  );
}
