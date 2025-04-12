import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import '@/styles/globals.css';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [codingQuestion, setCodingQuestion] = useState("");
  const [behavioralQuestion, setBehavioralQuestion] = useState("");
  const [codingAnswer, setCodingAnswer] = useState("");
  const [behavioralAnswer, setBehavioralAnswer] = useState("");
  const [message, setMessage] = useState("");

  const fetchCodingQuestion = async () => {
    const response = await fetch("/api/coding-questions", {
      method: "POST",
      body: JSON.stringify({ difficulty: "easy" }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setCodingQuestion(data.question);
  };

  const fetchBehavioralQuestion = async () => {
    const response = await fetch("/api/behavioral-questions", {
      method: "POST",
    });
    const data = await response.json();
    setBehavioralQuestion(data.question);
  };

  const submitAnswer = async (category, question, answer) => {
    if (!answer) {
      setMessage("Answer cannot be empty");
      return;
    }
    const { error } = await supabase.from("answers").insert([
      { category, question, answer },
    ]);
    if (error) {
      setMessage("Failed to submit. Try again!");
    } else {
      setMessage("Answer submitted successfully!");
    }
  };

  useEffect(() => {
    fetchCodingQuestion();
    fetchBehavioralQuestion();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Navbar */}
      <nav className="bg-blue-600 w-full p-4 shadow-lg flex justify-center space-x-6 text-white font-semibold">
        <a href="/" className="hover:underline">Home</a>
        <a href="/coding-test" className="hover:underline">Coding Test</a>
        <a href="/behavioral" className="hover:underline">Behavioral</a>
        <a href="/admin" className="hover:underline">Admin</a>
      </nav>

      <h1 className="text-4xl font-bold text-center mt-8 text-gray-800">Interview Prep</h1>

      {/* Coding Question Section */}
      <div className="mt-8 w-full max-w-2xl bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700">Coding Question</h2>
        <p className="mt-2 text-gray-600">{codingQuestion || "Loading..."}</p>
        <textarea
          className="w-full p-3 mt-4 border rounded-lg"
          placeholder="Write your answer here..."
          value={codingAnswer}
          onChange={(e) => setCodingAnswer(e.target.value)}
        ></textarea>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => submitAnswer("coding", codingQuestion, codingAnswer)}
        >
          Submit Answer
        </button>
      </div>

      {/* Behavioral Question Section */}
      <div className="mt-8 w-full max-w-2xl bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700">Behavioral Question</h2>
        <p className="mt-2 text-gray-600">{behavioralQuestion || "Loading..."}</p>
        <textarea
          className="w-full p-3 mt-4 border rounded-lg"
          placeholder="Write your answer here..."
          value={behavioralAnswer}
          onChange={(e) => setBehavioralAnswer(e.target.value)}
        ></textarea>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => submitAnswer("behavioral", behavioralQuestion, behavioralAnswer)}
        >
          Submit Answer
        </button>
      </div>

      {/* Message Box */}
      {message && <p className="mt-4 text-lg text-green-600">{message}</p>}
    </div>
  );
}