"use client";

import { useState, useEffect } from "react";
import supabase from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        router.push("/"); // Redirect to home after logout
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  async function handleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) console.error("Login error:", error);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/"); // Ensure navigation after logout
  }

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <Link href="/" className="text-lg font-bold">Student App</Link>

      {/* Mobile Menu Icon */}
      <button className="lg:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-4">
        {user ? (
          <>
            <Link href="/student-list" className="hover:underline">📋 Student List</Link>
            <Link href="/add-student">
              <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition duration-200">
                ➕ Add Student
              </button>
            </Link>
            <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-200">
              🚪 Logout
            </button>
          </>
        ) : (
          <button onClick={handleSignIn} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition duration-200">
            🔑 Sign in with Google
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 p-5 flex flex-col space-y-4 lg:hidden">
          {user ? (
            <>
              <Link href="/student-list" className="text-white block hover:underline">📋 Student List</Link>
              <Link href="/add-student">
                <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded w-full">
                  ➕ Add Student
                </button>
              </Link>
              <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded w-full">
                🚪 Logout
              </button>
            </>
          ) : (
            <button onClick={handleSignIn} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-full">
              🔑 Sign in with Google
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
