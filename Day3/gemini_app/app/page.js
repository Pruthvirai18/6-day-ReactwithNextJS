"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const askAI = async () => {
    if (!question.trim()) return;
    setLoading(true);

    const newChat = [...chatHistory, { role: "user", text: question }];
    setChatHistory(newChat);
    setQuestion("");

    try {
      const res = await axios.post("/api/gemini", { question });

      setChatHistory([...newChat, { role: "ai", text: res.data.reply }]);
    } catch (error) {
      setChatHistory([...newChat, { role: "ai", text: "Error fetching AI response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('/pngtree-abstract-technology-big-data-background-concept-generate-ai-image_15686420.jpg')" // Use a direct path to your local image here
      }}
    >
      {/* Dark Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative w-full max-w-md bg-gray-900/90 backdrop-blur-md shadow-xl rounded-xl p-6 border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-4 text-white drop-shadow-lg">
          Ask <span className="text-blue-400">Gemini AI</span>
        </h1>

        {/* Chat Messages */}
        <div
          ref={chatRef}
          className="h-80 overflow-y-auto p-3 space-y-3 bg-gray-800 rounded-lg shadow-inner border border-gray-700"
        >
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg w-fit max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-500 text-white self-end ml-auto shadow-md"
                  : "bg-gray-700 text-gray-100 shadow-md"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <p className="animate-pulse text-gray-400">AI is thinking...</p>}
        </div>

        {/* Input & Button */}
        <div className="mt-3 flex gap-2">
          <textarea
            className="w-full p-3 border rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            rows="2"
            placeholder="Ask something..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            onClick={askAI}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all disabled:opacity-50 shadow-lg"
            disabled={loading}
          >
            {loading ? "..." : "Ask"}
          </button>
        </div>
      </div>
    </div>
  );
}
