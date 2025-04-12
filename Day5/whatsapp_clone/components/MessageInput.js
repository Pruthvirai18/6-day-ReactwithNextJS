import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function MessageInput({ chatId }) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    const { error } = await supabase.from("messages").insert([
      {
        chat_id: chatId,
        content: message,
        created_at: new Date(),
      },
    ]);

    if (error) {
      console.error("Error sending message:", error.message);
    } else {
      setMessage(""); // Clear input on success
    }
  };

  return (
    <div className="p-4 flex bg-gray-200">
      <input
        className="flex-1 p-2 border rounded-lg"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button
        onClick={sendMessage}
        className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Send
      </button>
    </div>
  );
}
