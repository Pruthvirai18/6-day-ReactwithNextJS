export default function UserProfile({ user }) {
  return (
    <div className="p-4 bg-gray-200 rounded-md mt-2 shadow-md">
      <h3 className="text-lg font-bold">User Profile</h3>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}