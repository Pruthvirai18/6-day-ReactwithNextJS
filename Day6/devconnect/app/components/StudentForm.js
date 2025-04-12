"use client";
import { useState } from "react";
import supabase from "@app/lib/supabase";

export default function StudentForm() {
  const [student, setStudent] = useState({
    name: "",
    usn: "",
    department: "",
    blood_group: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("students").insert([student]);

    if (error) {
      alert("Error adding student: " + error.message);
    } else {
      alert("Student added successfully!");
      setStudent({ name: "", usn: "", department: "", blood_group: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <input type="text" name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
      <input type="text" name="usn" placeholder="USN" value={student.usn} onChange={handleChange} required />
      <input type="text" name="department" placeholder="Department" value={student.department} onChange={handleChange} required />
      <input type="text" name="blood_group" placeholder="Blood Group" value={student.blood_group} onChange={handleChange} required />
      <button type="submit">Create Student</button>
    </form>
  );
}
