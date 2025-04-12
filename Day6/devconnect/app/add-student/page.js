"use client";

import { useState } from "react";
import supabase from "@/app/lib/supabase";
import { useRouter } from "next/navigation";

export default function AddStudent() {
  const router = useRouter();
  const [newStudent, setNewStudent] = useState({
    name: "",
    usn: "",
    department: "",
    blood_group: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const addStudent = async (e) => {
    e.preventDefault();
    console.log("Adding student:", newStudent);

    // Check if student exists
    const { data: existingStudent } = await supabase
      .from("student")
      .select("*")
      .eq("email", newStudent.email)
      .single();

    if (existingStudent) {
      alert("A student with this email already exists.");
      return;
    }

    // Insert into database
    const { data, error } = await supabase.from("student").insert([newStudent]).select();

    if (error) {
      console.error("Error adding student:", error.message);
      alert("Failed to add student: " + error.message);
      return;
    }

    console.log("Student added successfully:", data);
    alert("Student added successfully!");

    // Redirect back to home after adding
    router.push("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 text-gray-900">
      <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-300 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Student</h2>
        <form onSubmit={addStudent} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newStudent.name}
            onChange={handleInputChange}
            required
            className="block w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="usn"
            placeholder="USN"
            value={newStudent.usn}
            onChange={handleInputChange}
            required
            className="block w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={newStudent.department}
            onChange={handleInputChange}
            required
            className="block w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="blood_group"
            placeholder="Blood Group"
            value={newStudent.blood_group}
            onChange={handleInputChange}
            required
            className="block w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={handleInputChange}
            required
            className="block w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
}
