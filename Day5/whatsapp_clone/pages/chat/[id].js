import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import ChatWindow from "../../components/ChatWindow";
import MessageInput from "../../components/MessageInput";

export default function Chat() {
  const router = useRouter();
  const { id } = router.query; // Get chat ID from URL

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <h1 className="text-xl font-bold p-4 bg-green-500 text-white">Chat: {id}</h1>
      <ChatWindow chatId={id} />
      <MessageInput chatId={id} />
    </div>
  );
}
