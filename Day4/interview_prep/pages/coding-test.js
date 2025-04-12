import { useState, useEffect } from "react";
import CodingTest from "../components/CodingTest";

export default function CodingTestPage() {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    async function fetchQuestion() {
      const res = await fetch("/api/coding-questions", { method: "POST" });
      const data = await res.json();
      setQuestion(data.question);
    }
    fetchQuestion();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Coding Test</h1>
      {question ? <CodingTest question={question} /> : <p>Loading...</p>}
    </div>
  );
}