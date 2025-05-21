'use client'

import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false); // hydration flag
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getSession();
    setIsHydrated(true); // mark hydration complete on client
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!isHydrated) {
    // Return null during server render & before hydration completes on client
    return null;
  }

  return (
    <nav className="flex justify-between items-center bg-white text-gray-800 px-6 py-4 shadow-md sticky top-0 z-50">
      {/* Left: Logo + Site Name */}
      <div className="flex items-center space-x-3">
        <img className='w-10' src="/logo.jpg" alt="" />
        <Link href="/" className="text-2xl font-semibold tracking-tight hover:text-purple-600 transition-colors">
          Chatify
        </Link>
      </div>

      {/* Right: Navigation Links */}
      <div className="flex font-bold items-center gap-6 text-base">
        <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>

        {user ? (
          <>
            <Link href="/chatbot" className="hover:text-purple-600 transition-colors">Chatbot</Link>
            <button
              onClick={handleLogout}
              className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-purple-600 transition-colors">Login</Link>
            <Link href="/register" className="hover:text-purple-600 transition-colors">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

