"use client";
import { useUser } from "../../context/UserContext";


export default function UserProfile() {
  const { user } = useUser();

  return (
    <div className="mt-4 p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold">User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}