"use client"; 
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }
        alert(`Login Successful!\nEmail: ${email}`);
        router.push("/home");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-indigo-900">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg shadow-xl rounded-xl p-8 w-[400px] flex flex-col items-center">
                <img src="images.jpg" alt="Logo" className="w-24 h-24 mb-4 rounded-full shadow-md" />
                <h2 className="text-white text-2xl font-semibold mb-6">Welcome Back</h2>
                
                <form className="flex flex-col items-center gap-4 w-full" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 w-3/4 border rounded-md bg-white bg-opacity-70 text-black focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                        placeholder="Enter your email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 w-3/4 border rounded-md bg-white bg-opacity-70 text-black focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                        placeholder="Enter your password"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-800 rounded-full p-3 text-white w-3/4 hover:bg-blue-700 transition-all shadow-md"
                    >
                        Login
                    </button>
                </form>

                
            </div>
        </div>
    );
}
