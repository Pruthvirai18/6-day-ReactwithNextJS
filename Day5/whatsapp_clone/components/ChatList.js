import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function ChatList() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await supabase.from("chats").select("*");
      setChats(data || []);
    };

    fetchChats();
  }, []);

  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <h2 className="text-xl mb-2">Chats</h2>
      {chats.map((chat) => (
        <Link key={chat.id} href={`/chat/${chat.id}`}>
          <div className="p-2 bg-white shadow rounded mb-2 cursor-pointer hover:bg-gray-100">
            {chat.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
