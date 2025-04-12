import { UserProvider } from "../context/UserContext";
export default function Layout({ children }) {
  return (
    <html>
      <body>
        <UserProvider>
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Context API Example</h1>
          {children}</div></UserProvider>
          </body>
          </html>
      
  );
}