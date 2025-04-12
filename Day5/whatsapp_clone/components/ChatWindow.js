import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ChatWindow({ chatId }) {
  const [messages, setMessages] = useState([]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });

      if (error) console.error("Error fetching messages:", error.message);
      else setMessages(data);
    };

    fetchMessages();

    // Subscribe to real-time messages
    const subscription = supabase
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          console.log("New message:", payload);
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [chatId]);

  return (
    <div className="flex flex-col h-full p-4">
      <h2 className="text-lg font-bold">Chat: {chatId}</h2>
      <div className="flex-1 overflow-auto bg-gray-100 p-4 rounded-lg">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet...</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="p-2 bg-white rounded shadow my-2">
              {msg.content}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
