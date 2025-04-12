import Dashboard from "./dashboard/page";

export default function Home() {
  const user = { name: "Alice", age: 25 };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Prop Drilling Example in Next.js</h1>
      <Dashboard user={user} />
    </div>
  );
}