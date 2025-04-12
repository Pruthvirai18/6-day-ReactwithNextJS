import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/chat/general");
  }, []);

  return <div className="text-center p-4">Loading chat...</div>;
}
