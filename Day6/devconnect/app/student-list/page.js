"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/app/lib/supabase";
import Navbar from "@/app/components/Navbar";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/"); // Redirect to home if not logged in
      } else {
        setUser(user);
        fetchStudents();
      }
    };

    const fetchStudents = async () => {
      const { data, error } = await supabase.from("student").select("*");
      if (error) {
        console.error("Error fetching students:", error.message);
      } else {
        setStudents(data);
      }
      setLoading(false);
    };

    checkUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        setUser(null);
        router.push("/"); // Redirect to home when logged out
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (!user) {
    return <p className="text-center mt-10 text-red-500">Redirecting...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Student List</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : students.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <div
                key={student.email}
                className="bg-white p-4 shadow-md rounded-lg border border-gray-300"
              >
                <h3 className="text-xl font-semibold text-blue-600">{student.name}</h3>
                <p className="text-gray-700"><strong>USN:</strong> {student.usn}</p>
                <p className="text-gray-700"><strong>Department:</strong> {student.department}</p>
                <p className="text-gray-700"><strong>Blood Group:</strong> {student.blood_group}</p>
                <p className="text-gray-500 text-sm"><strong>Email:</strong> {student.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No student details found.</p>
        )}
      </div>
    </div>
  );
}
