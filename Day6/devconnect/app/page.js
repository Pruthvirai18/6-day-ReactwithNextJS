"use client";

import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabase";
import Navbar from "./components/Navbar";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchUserAndStudents = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

      setUser(user);

      // Fetch students only if user is logged in
      if (user) {
        fetchStudents();
      } else {
        setStudents([]); // Clear students on logout
      }
    };

    const fetchStudents = async () => {
      const { data, error } = await supabase.from("student").select("*");

      if (error) {
        console.error("Error fetching students:", error.message);
      } else {
        setStudents(data);
      }
    };

    fetchUserAndStudents();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchStudents(); // Fetch students again if the user logs in
      } else {
        setUser(null);
        setStudents([]); // Clear students on logout
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Student App</h1>
        <p className="text-center text-gray-600">
          "Manage and view all student records seamlessly in one place."
        </p>

        {user ? (
          <>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Student List ({students.length})
              </h2>

              {students.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {students.map((student) => (
                    <div
                      key={student.email}
                      className="bg-white p-4 shadow-md rounded-lg border border-gray-300"
                    >
                      <h3 className="text-xl font-semibold text-blue-600">{student.name}</h3>
                      <p className="text-gray-700">
                        <strong>USN:</strong> {student.usn}
                      </p>
                      <p className="text-gray-700">
                        <strong>Department:</strong> {student.department}
                      </p>
                      <p className="text-gray-700">
                        <strong>Blood Group:</strong> {student.blood_group}
                      </p>
                      <p className="text-gray-500 text-sm">
                        <strong>Email:</strong> {student.email}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-gray-500 text-center">No student details found.</p>
              )}
            </div>
          </>
        ) : (
          <p className="mt-4 text-center text-red-500 font-semibold text-lg">
            Please log in to access student records.
          </p>
        )}
      </div>
    </div>
  );
}
