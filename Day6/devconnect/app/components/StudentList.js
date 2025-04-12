"use client";
import { useEffect, useState } from "react";
import supabase from "@app/lib/supabase";

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const { data, error } = await supabase.from("students").select("*");
    if (error) {
      console.error("Error fetching students:", error);
    } else {
      setStudents(data);
    }
  };

  return (
    <div>
      <h2>Student Details</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <strong>{student.name}</strong> | USN: {student.usn} | Dept: {student.department} | Blood: {student.blood_group}
          </li>
        ))}
      </ul>
    </div>
  );
}
